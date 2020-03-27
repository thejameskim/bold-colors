function onCvLoaded() {
    cv.onRuntimeInitialized = onReady;
}
const video = document.getElementById('videoInput');
const width = 320;
const height = 240;
const FPS = 30;
let stream;
let streaming = false;

const HSV_RANGES = {
    'yellow': {
        'lower': [20, 100, 100, 0],
        'upper': [30, 255, 255, 255]
    },
    'red': {
        'lower': [],
        'upper': []
    },
    'green': {
        'lower': [50, 50, 50, 0],
        'upper': [70, 255, 255, 255]
    },
    'purple': {
        'lower': [],
        'upper': []
    },
    'orange': {
        'lower': [],
        'upper': []
    },
    'black': {
        'lower': [],
        'upper': []
    },
    'blue': {
        'lower': [110, 100, 100, 0],
        'upper': [130, 255, 255, 255]
    },
    'pink': {
        'lower': [],
        'upper': []
    },
    'white': {
        'lower': [],
        'upper': []
    },
}

function onReady() {
    let src;
    let dst;
    let hsv;
    const cap = new cv.VideoCapture(video);
    actionBtn.addEventListener('click', () => {
        if (streaming) {
            stop();
            actionBtn.textContent = 'Start';
        } else {
            start();
            actionBtn.textContent = 'Stop';
        }
    });

    function start() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(_stream => {
                stream = _stream;
                console.log('stream', stream);
                video.srcObject = stream;
                video.play();
                streaming = true;
                src = new cv.Mat(height, width, cv.CV_8UC4);
                dst = new cv.Mat(height, width, cv.CV_8UC1);
                hsv = new cv.Mat();
                setTimeout(processVideo, 0)
            })
            .catch(err => console.log(`An error occurred: ${err}`));
    }

    function stop() {
        if (video) {
            video.pause();
            video.srcObject = null;
        }
        if (stream) {
            stream.getVideoTracks()[0].stop();
        }
        streaming = false;
    }

    function processVideo() {
        if (!streaming) {
            src.delete();
            dst.delete();
            return;
        }
        const begin = Date.now();
        cap.read(src);
        src.copyTo(dst);
        
        let selectedColor = selector.value
        cv.cvtColor(src, hsv, cv.COLOR_RGB2HSV);
        let low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), HSV_RANGES[selectedColor].lower);
        let high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), HSV_RANGES[selectedColor].upper);
        cv.inRange(hsv, low, high, hsv);

        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(hsv, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
        const contoursSize = contours.size();

        for (let i = 0; i < contoursSize; ++i) {
            let obj = contours.get(i);
            let rect = cv.boundingRect(obj);
            let point1 = new cv.Point(rect.x, rect.y);
            let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
            cv.rectangle(dst, point1, point2, [255, 0, 0, 255])
        }

        cv.imshow('canvasOutput', dst);

        const delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }
}