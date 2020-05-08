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

	useEffect(() => {
		let canvasUpdatingInterval: NodeJS.Timeout;

		if (canvasEl) {
			const canvasElCurrent = canvasEl.current;
			if (!canvasElCurrent) {
				return;
			}

			const context = canvasElCurrent.getContext('2d');

			if (!context) {
				return;
			}

			cvHelper.setCanvasElCurrent(canvasElCurrent);

			canvasElCurrent.addEventListener("mousedown", (event) => {
				if (!hideWelcome) {
					hideWelcomeFunc(true);
				}
				const pixelRGB = GraphicsManipulator.getPixelRGB(context, canvasElCurrent, event);
				const hsvSelectColor = GraphicsManipulator.RGBtoHSV(pixelRGB);
				cvHelper.setHSVSelectColor(hsvSelectColor);
			});

			canvasUpdatingInterval = setInterval(async () => {
				let toDraw = cvHelper.getLatestVideoFrame();
				context.drawImage(toDraw, 0, 0, window.innerWidth, window.innerHeight * HEIGHT_MULTIPLIER);
				cvHelper.draw(context, canvasElCurrent);
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
	</div>
}