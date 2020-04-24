navigator.getUserMedia(
    {
        video: true
    },
    function (localMediaStram) {

    },
    function () { }
)

function $(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

// Convert range of given rgb value to 0 to 1 range
function convertRGB(rgb) {
    return (1 / 255) * rgb;
}

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