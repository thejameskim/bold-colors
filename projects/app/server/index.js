function onCvLoaded () {
  console.log('cv', cv);
  cv.onRuntimeInitialized = onReady;
}
const video = document.getElementById('videoInput');
const width = 320;
const height = 240;
const FPS = 30;
let stream;
let streaming = false;

function onReady () {
    let src;
    let dst;
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

    function start () {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(_stream => {
            stream = _stream;
            console.log('stream', stream);
            video.srcObject = stream;
            video.play();
            streaming = true;
            src = new cv.Mat(height, width, cv.CV_8UC4);
            dst = new cv.Mat(height, width, cv.CV_8UC1);
            setTimeout(processVideo, 0)
        })
        .catch(err => console.log(`An error occurred: ${err}`));
    }
    
    function stop () {
        if (video) {
            video.pause();
            video.srcObject = null;
        }
        if (stream) {
            stream.getVideoTracks()[0].stop();
        }
        streaming = false;
    }

    function processVideo () {
        if (!streaming) {
            src.delete();
            dst.delete();
            return;
        }
        const begin = Date.now();
        cap.read(src)
        let dst = new cv.Mat();

        // hsv = cv.cvtColor(src, dst, cv.COLOR_BGR2HSV);

        // Red
        let low = new cv.Mat(src.rows, src.cols, src.type(), [161, 155, 84, 0]);
        let high = new cv.Mat(src.rows, src.cols, src.type(), [179, 255, 255, 0]);
        cv.inRange(src, low, high, dst);
        cv.imshow('canvasOutput', dst);
        src.delete(); dst.delete(); low.delete(); high.delete();
        
        const delay = 1000/FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }
}