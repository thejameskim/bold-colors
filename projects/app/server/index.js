function onCvLoaded() {
    cv.onRuntimeInitialized = onReady;
}
const video = document.getElementById('videoInput');
const width = 640;
const height = 480;
const FPS = 30;
let stream;
let streaming = false;

const HSV_RANGES = {
    'yellow': {
        'lower': [20, 100, 100, 0],
        'upper': [30, 255, 255, 255]
    },
    'red': {
        'lower': [170, 100, 0, 0],
        'upper': [180, 255, 255, 255]
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
        'lower': [10, 100, 20, 0],
        'upper': [25, 255, 255, 255]
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
        'lower': RGBtoHSV(255, 192, 203, 0),
        'upper': RGBtoHSV(255, 192, 203, 255)
    },
    'white': {
        'lower': [],
        'upper': []
    },
}

// generateColorOptions();

// function generateColorOptions() {
//     let dropDown = document.getElementById("selector");
//     Object.keys(HSV_RANGES).forEach((color) => {
//         let option = document.createElement("option");
//         option.value = color;
//         option.innerText = color;
//         dropDown.appendChild(option);
//     });
// }

// Code taken from: http://coecsl.ece.illinois.edu/ge423/spring05/group8/finalproject/hsv_writeup.pdf
// based on: https://docs.opencv.org/3.4/de/d25/imgproc_color_conversions.html#color_convert_rgb_hsv 
function RGBtoHSV(r, g, b, lowerUpper) {

    let HSV = {}

    min = Math.min(r, g, b);
    max = Math.max(r, g, b);

    //  Calcuate V
    HSV.v = max;

    // Calculate S
    let delta = max - min;
    if (max != 0) {
        HSV.s = (delta / max) * 255;
    } else {
        HSV.s = 0;
        HSV.h = -1;
        return
    }

    // Calculate H
    if (r == max) {
        HSV.h = (g - b) / delta;
    } else if (g == max) {
        HSV.h = 2 + (b - r) / delta;
    } else {
        HSV.h = 4 + (r - g) / delta;
    }
    HSV.h *= 60;
    if (HSV.h < 0) {
        HSV.h += 360;
    }

    return [HSV.h, HSV.s, HSV.v, lowerUpper];
}

// Convert range of given rgb value to 0 to 1 range
function convertRGB(rgb) {
    return (1 / 255) * rgb;
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

        const vid = document.getElementById('videoInput');
        const canvas = document.getElementById('touchPad');
        const context = canvas.getContext('2d');

        canvas.addEventListener("mousedown", function(event) { 
            const rect = canvas.getBoundingClientRect(); 
            let x = event.clientX - rect.left; 
            let y = event.clientY - rect.top; 
            const imageData = context.getImageData(x, y, 1, 1).data;
            const pixelRGB = {
                r: imageData[0],
                g: imageData[1],
                b: imageData[2]
            }
            console.log(pixelRGB);
            const div = document.getElementById("selectedColor");
            div.style.backgroundColor = "rgb(" + pixelRGB.r + "," 
                + pixelRGB.g + "," + pixelRGB.b + ")";
            div.innerText = pixelRGB.r + "," + pixelRGB.g + "," + pixelRGB.b;
            // getMousePosition(canvas, e); 
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(_stream => {
                stream = _stream;
                video.srcObject = stream;
                return video.play();
            })
            .then(() => {
                streaming = true;
                src = new cv.Mat(height, width, cv.CV_8UC4);
                dst = new cv.Mat(height, width, cv.CV_8UC1);
                hsv = new cv.Mat();
                // setTimeout(processVideo, 0)
                this.intervalID = setInterval(() => {
                    console.log("draw");
                    context.drawImage(vid, 0, 0, vid.clientWidth, vid.clientHeight)
                }, 500);
            })
            .catch(err => console.log(`An error occurred: ${err}`));
    }

    // https://www.geeksforgeeks.org/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/
    function getMousePosition(canvas, event) { 
        const rect = canvas.getBoundingClientRect(); 
        let x = event.clientX - rect.left; 
        let y = event.clientY - rect.top; 
        console.log("Coordinate x: " + x,  
                    "Coordinate y: " + y); 
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
        clearInterval(this.intervalID);
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