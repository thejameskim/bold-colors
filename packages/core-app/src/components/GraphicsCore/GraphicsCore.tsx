import React, { useRef, useEffect } from 'react';
import { OpenCVHelper } from '../../utils/OpenCVHelper';
import './GraphicsCore.css';
import { GraphicsManipulator } from '../../utils/GraphicsManipulator';

type GraphicsCoreProps = {
	cvHelper: OpenCVHelper,
	hideWelcome: Boolean,
	hideWelcomeFunc: React.Dispatch<React.SetStateAction<Boolean>>
}

const REFRESH_RATE = 0.017;
const HEIGHT_MULTIPLIER = 0.9

// GraphicsCore is the canvas element that also keeps track of all the OpenCV state information
export const GraphicsCore: React.FC<GraphicsCoreProps> = ({
	cvHelper,
	hideWelcome,
	hideWelcomeFunc
}) => {
	const canvasEl = useRef<HTMLCanvasElement | null>(null);
	const canvasEl2 = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		let canvasUpdatingInterval: NodeJS.Timeout;

		if (canvasEl) {
			const canvasElCurrent = canvasEl.current;
			const canvasEl2Current = canvasEl2.current;

			if (!canvasElCurrent || !canvasEl2Current) {
				return;
			}

			const context = canvasElCurrent.getContext('2d');
			const context2 = canvasEl2Current.getContext('2d');

			if (!context || !context2) {
				return;
			}

			cvHelper.setCanvasElCurrent(canvasElCurrent, canvasEl2Current);

			canvasElCurrent.addEventListener("mousedown", (event) => {
				if (!hideWelcome) {
					hideWelcomeFunc(true);
				}
				const pixelRGB = GraphicsManipulator.getPixelRGBMouse(context, canvasEl2Current, event);
				const hsvSelectColor = GraphicsManipulator.RGBtoHSV(pixelRGB);
				cvHelper.setHSVSelectColor(hsvSelectColor);
			});

			canvasElCurrent.addEventListener("touchend", (event) => {
				if (!hideWelcome) {
					hideWelcomeFunc(true);
				}
				const pixelRGB = GraphicsManipulator.getPixelRGBTouch(context, canvasEl2Current, event);
				const hsvSelectColor = GraphicsManipulator.RGBtoHSV(pixelRGB);
				cvHelper.setHSVSelectColor(hsvSelectColor);
			})

			canvasUpdatingInterval = setInterval(async () => {
				let toDraw = cvHelper.getLatestVideoFrame();

				context.drawImage(toDraw, 0, 0, window.innerWidth, window.innerHeight * HEIGHT_MULTIPLIER);

				// clone context 1 to context 2 but contrasted
				const imageData = context.getImageData(0, 0, window.innerWidth, window.innerHeight * HEIGHT_MULTIPLIER);

				const clonedImageData = new ImageData(
					new Uint8ClampedArray(imageData.data),
					imageData.width,
					imageData.height
				);

				GraphicsManipulator.contrastImage(clonedImageData, 2.5);

				// uncomment to see live contrast data
				context2.putImageData(clonedImageData, 0, 0);
				const getNewImageData = context2.getImageData(0, 0, window.innerWidth, window.innerHeight * HEIGHT_MULTIPLIER);
				context.putImageData(getNewImageData, 0, 0);

				cvHelper.draw(context, canvasElCurrent, context2, canvasEl2Current, getNewImageData);
			}, REFRESH_RATE);
		}

		return () => {
			clearInterval(canvasUpdatingInterval);
		}
	}, [canvasEl, cvHelper]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			if (canvasEl && canvasEl.current) {
				canvasEl.current.width = window.innerWidth;
				canvasEl.current.height = window.innerHeight * HEIGHT_MULTIPLIER;
			}

			cvHelper.setSourceAndDestination(window.innerHeight * HEIGHT_MULTIPLIER, window.innerWidth);
		});

	}, [canvasEl, cvHelper]);

	return <div className="graphics-core">
		<canvas height={window.innerHeight * HEIGHT_MULTIPLIER} width={window.innerWidth} ref={canvasEl} />
		<canvas style={{
			margin: 0,
			padding: 0,
		}} hidden height={window.innerHeight * HEIGHT_MULTIPLIER} width={window.innerWidth} ref={canvasEl2} />
	</div>
}