export const BORDER_THRESHOLD = 5;
export const HSV_THRESHOLD = 30;

export class GraphicsManipulator {
	static getPixelRGBTouch(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		event: TouchEvent
	): PixelRGB {
		const rect = canvas.getBoundingClientRect();

		const x = event.changedTouches[0].clientX - rect.left;
		const y = event.changedTouches[0].clientY - rect.top;
		const imageData = context.getImageData(x, y, 1, 1).data;
		return {
			r: imageData[0],
			g: imageData[1],
			b: imageData[2]
		};
	}

	static getPixelRGBMouse(
		context: CanvasRenderingContext2D,
		canvas: HTMLCanvasElement,
		event: MouseEvent
	): PixelRGB {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const imageData = context.getImageData(x, y, 1, 1).data;
		return {
			r: imageData[0],
			g: imageData[1],
			b: imageData[2]
		};
	}

	// Code taken from: http://coecsl.ece.illinois.edu/ge423/spring05/group8/finalproject/hsv_writeup.pdf
	// based on: https://docs.opencv.org/3.4/de/d25/imgproc_color_conversions.html#color_convert_rgb_hsv 
	static RGBtoHSV(pixelRGB: PixelRGB): PixelHSV {
		const { r, g, b } = pixelRGB;

		const HSV: PixelHSV = {
			h: 0,
			s: 0,
			v: 0
		}

		const min = Math.min(r, g, b);
		const max = Math.max(r, g, b);

		// V
		HSV.v = max;

		// S
		const delta = max - min;
		if (max === 0) {
			HSV.s = 0;
			HSV.h = -1;
			return HSV;
		}

		HSV.s = (delta / max) * 255;

		// H
		if (r === max) {
			HSV.h = (g - b) / delta;
		} else if (g === max) {
			HSV.h = 2 + (b - r) / delta;
		} else {
			HSV.h = 4 + (r - g) / delta;
		}

		HSV.h *= 60;

		if (HSV.h < 0) {
			HSV.h += 360;
		}

		HSV.h /= 2;

		return HSV;
	}

	/**
	 * Gets formatted hsv
	 * @param hsv hsv
	 * @param numToAdd number to offset HSV by
	 * @param HSV4 4th param opencv requests // TODO: (alpha?)
	 */
	static GetHsvFormatted(hsv: PixelHSV, numToAdd: number, HSV4: number): number[] {
		return [
			hsv.h += numToAdd,
			hsv.s += numToAdd,
			hsv.v += numToAdd,
			HSV4
		]
	}

	// contrast must be [-100..100]
	// https://stackoverflow.com/questions/10521978/html5-canvas-image-contrast
	static contrastImage(imageData: ImageData, contrast: number) {
		const data = imageData.data;
		const contrastAsDecimalShiftRange = (contrast / 100) + 1;
		const intercept = 128 * (1 - contrastAsDecimalShiftRange);
		for (let i = 0; i < data.length; i += 4) {
			for (let j = i; j < i + 3; j++) {
				data[j] = data[j] * contrast + intercept;
			}
		}
		return data;
	}
}

export type PixelRGB = {
	r: number,
	g: number,
	b: number
}

export type PixelHSV = {
	h: number,
	s: number,
	v: number
}