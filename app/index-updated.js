"use strict";
function onCvLoaded() {
    cv.onRuntimeInitialized = onReady;
}

const MOBILE_NAV_OFFSET = qs("nav").clientHeight;
const settingColor = {
    black: [0, 0, 0, 255],
    white: [255, 255, 255, 255],
    red: [255, 0, 0, 255],
    green: [0, 255, 0, 255],
    blue: [0, 0, 255, 255],
    purple: [102, 0, 204, 255],
    yellow: [255, 255, 51, 255],
    orange: [255, 153, 51, 255]
}
const width = window.innerWidth;
const height = window.innerHeight - MOBILE_NAV_OFFSET;
generateVideoOutput();
const video = $('videoInput');
const FPS = 30;
let stream;
let streaming = false;

setMobileBtn();
generateColorOptions();

function generateVideoOutput() {
    const video = document.createElement("video");
    video.width = width;
    video.height = height;
    video.id = "videoInput";
    video.classList.add("hideVid");
    qs("main").appendChild(video);

    console.log(video.width);
    console.log(video.height);

    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = width;
    outputCanvas.height = height;
    outputCanvas.style.width = width + "px";
    outputCanvas.style.height = height + "px";
    outputCanvas.id = "touchPad";
    qs("main").appendChild(outputCanvas);
}

function generateColorOptions() {
    const colors = Object.keys(settingColor);
    colors.forEach((color) => {
        let option = document.createElement("option");
        option.innerText = color;
        option.value = color;
        qs("#settings select").append(option);
    });
}

function setMobileBtn() {

    $("exitSetBtn").addEventListener("click", () => {
        $("settings").classList.add("hidden");
    });

    $("exitHTBtn").addEventListener("click", (event) => {
        $("how-to").classList.add("hidden");
        $("touchPad").classList.toggle("hidden");
    });

    $("helpBtn").addEventListener("click", (event) => {
        if (!$("saveBtn").classList.contains("hidden")) {
            $("saveBtn").classList.toggle("hidden");
        }
        $("how-to").classList.toggle("hidden");
        $("touchPad").classList.toggle("hidden");
    });

    $("saveBtn").addEventListener("click", () => {
        let image = $("touchPad").toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
    });

    $("setBtn").addEventListener("click", (event) => {
        $("settings").classList.toggle("hidden");
    });
}

function onReady() {

    let src;
    let dst;
    let hsv;
    let hsvSelectColor;
    let intervalID;

    const canvas = $('touchPad');
    const context = canvas.getContext('2d');
    const cap = new cv.VideoCapture(video);
    const radioBtn = qsa("input");
    const dropDown = qs("select");

    $("startBtn").addEventListener("click", () => {
        $("welcome").style.display = "none";
        start();
    });

    $("touchPad").addEventListener("mousedown", function (event) {
        let pixelRGB = getPixelRGB(event);
        hsvSelectColor = RGBtoHSV(pixelRGB.r, pixelRGB.g, pixelRGB.b);
        clearInterval(intervalID);
        setTimeout(processVideo, 0);
    });

    $("camBtn").addEventListener("click", () => {
        $("saveBtn").classList.toggle("hidden");
        if (streaming) {
            stop();
        } else {
            start();
        }
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

        // const colorDisplay = qs("#selectColorDiv div");
        // if (colorDisplay) {
        //     colorDisplay.style.backgroundColor = "rgb(" + pixelRGB.r + 
        //         ", " + pixelRGB.g + ", " + pixelRGB.b + ")";
        //     const colorText = qs("#selectColorDiv span");
        //     colorText.innerText = pixelRGB.r + ", " + pixelRGB.g 
        //         + ", " + pixelRGB.b;
        // }

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
                intervalID = setInterval(() => {

                    context.drawImage(video, 0, 0, width, height)
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
        clearInterval(intervalID);
    }

    function processVideo() {
        if (!streaming || !video.srcObject) {
            src.delete();
            dst.delete();
            return
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