function onCvLoaded() {
    cv.onRuntimeInitialized = onReady;
}

navigator.getUserMedia(
    {
        video: true
    },
    function (localMediaStram) {

    },
    function () { }
)

const video = document.getElementById('videoInput');
const width = 640;
const height = 480;
const FPS = 30;
let stream;
let streaming = false;

let hidePopup = false;

const settingColor = {
    Black: [0, 0, 0, 255],
    White: [255, 255, 255, 255],
    Red: [255, 0, 0, 255],
    Green: [0, 255, 0, 255],
    Blue: [0, 0, 255, 255],
    Purple: [102, 0, 204, 255],
    Yellow: [255, 255, 51, 255],
    Orange: [255, 153, 51, 255]
}

const dropDown = document.querySelector("#set-info select");
let colors = Object.keys(settingColor);
colors.forEach((color) => {
    let option = document.createElement("option");
    option.innerText = color;
    option.value = color;
    dropDown.append(option);
});

const radioBtn = document.querySelectorAll("input");

const setDiv = document.querySelector("#set-info");
const setBtn = document.getElementById("setting");
const saveSetBtn = document.getElementById("save-btn");
setBtn.addEventListener("click", () => {
    setBtn.classList.toggle("hidden");
    setDiv.classList.toggle("hidden");
});
saveSetBtn.addEventListener("click", () => {
    setBtn.classList.toggle("hidden");
    setDiv.classList.toggle("hidden");
});


// Code taken from: http://coecsl.ece.illinois.edu/ge423/spring05/group8/finalproject/hsv_writeup.pdf
// based on: https://docs.opencv.org/3.4/de/d25/imgproc_color_conversions.html#color_convert_rgb_hsv 
function RGBtoHSV(r, g, b) {

    // r = convertRGB(r);
    // g = convertRGB(g);
    // b = convertRGB(b);

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

    return [HSV.h / 2, HSV.s, HSV.v];
}

// Convert range of given rgb value to 0 to 1 range
function convertRGB(rgb) {
    return (1 / 255) * rgb;
}

function onReady() {

    let src;
    let dst;
    let hsv;

    let hsvSelectColor;

    const vidElement = document.getElementById('videoInput');
    const canvas = document.getElementById('touchPad');
    const context = canvas.getContext('2d');
    const cap = new cv.VideoCapture(video);

    const camBtn = document.getElementById('cam');
    camBtn.addEventListener('click', () => {
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
    });

    const selectedColorDiv = document.querySelector("#selectColorDiv");

    actionBtn.addEventListener('click', () => {
        if (streaming) {
            stop();
            // cam.disabled = true;
            // cam.classList.add('hidden');
            // selectedColorDiv.classList.add('hidden');
            actionBtn.textContent = 'Start';
        } else {
            start();
            cam.disabled = false;
            // cam.classList.remove('hidden');
            // selectedColorDiv.classList.remove('hidden');
            if (!hidePopup) {
                hidePopup = true;
                let popUp = document.getElementById('popup');
                popUp.classList.add('hidden');
            }
            actionBtn.textContent = 'Stop';
        }
    });

    canvas.addEventListener("mousedown", function (event) {
        let pixelRGB = getPixelRGB(event);
        hsvSelectColor = RGBtoHSV(pixelRGB.r, pixelRGB.g, pixelRGB.b);
        clearInterval(this.intervalID);
        setTimeout(processVideo, 0);
    });

    function calcLowerHsv(num) {
        let lowerHSV = hsvSelectColor.slice();
        lowerHSV[0] -= num;
        lowerHSV[1] -= num;
        lowerHSV[2] -= num;
        lowerHSV[3] = 0;
        return lowerHSV;
    }

    function calcHigherHsv(num) {
        let higherHSV = hsvSelectColor.slice();
        higherHSV[0] += num;
        higherHSV[1] += num;
        higherHSV[2] += num;
        higherHSV[3] = 255;
        return higherHSV;
    }

    function getPixelRGB(event) {
        const rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        const imageData = context.getImageData(x, y, 1, 1).data;
        const pixelRGB = {
            r: imageData[0],
            g: imageData[1],
            b: imageData[2]
        }

        const div = document.querySelector("#selectColorDiv div");
        div.style.backgroundColor = "rgb(" + pixelRGB.r + ", "
            + pixelRGB.g + ", " + pixelRGB.b + ")";
        const divText = document.querySelector("#selectColorDiv span");
        divText.innerText = pixelRGB.r + ", " + pixelRGB.g + ", " + pixelRGB.b;

        return pixelRGB;
    }

    function start() {

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
                this.intervalID = setInterval(() => {
                    context.drawImage(vidElement, 0, 0, vidElement.clientWidth, vidElement.clientHeight)
                }, 500);
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

        let lowerHSV = calcLowerHsv(15);
        let higherHSV = calcHigherHsv(15);

        cv.cvtColor(src, hsv, cv.COLOR_RGB2HSV);
        let low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), lowerHSV);
        let high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), higherHSV);
        cv.inRange(hsv, low, high, hsv);

        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(hsv, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
        const contoursSize = contours.size();
        if (radioBtn[0].checked) {
            drawRect(contours, contoursSize, dst);
        } else if (radioBtn[1].checked) {
            drawCircle(contours, contoursSize, dst);
        } else {
            drawPolygon(contours, contoursSize, dst)
        }

        cv.imshow('touchPad', dst);

        const delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }

    function drawPolygon(contours, contoursSize, dst) {
        for (let i = 0; i < contoursSize; ++i) {
            cv.drawContours(dst, contours, i, settingColor[dropDown.value]);
        }
    }

    function drawRect(contours, contoursSize, dst) {
        for (let i = 0; i < contoursSize; ++i) {
            let obj = contours.get(i);
            let rect = cv.boundingRect(obj);
            let point1 = new cv.Point(rect.x, rect.y);
            let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
            cv.rectangle(dst, point1, point2, settingColor[dropDown.value])
        }
    }

    function drawCircle(contours, contoursSize, dst) {
        for (let i = 0; i < contoursSize; ++i) {
            let obj = contours.get(i);

            let M = cv.moments(obj)
            let cX = M["m10"] / M["m00"]
            let cY = M["m01"] / M["m00"]
            let mid = new cv.Point(cX, cY);

            let area = cv.contourArea(obj)
            let radius = Math.sqrt(4 * area / Math.PI) / 2;
            cv.circle(dst, mid, radius, settingColor[dropDown.value])
        }
    }
}