import { PixelHSV, GraphicsManipulator, BORDER_THRESHOLD, HSV_THRESHOLD } from '../utils/GraphicsManipulator';
import { HighlightColor, HIGHLIGHT_COLORS } from './HighlightColors';
import { Shapes, RECTANGLE_LINE_WIDTH, CIRCLE_LINE_WIDTH, LINE_TYPE } from './Shapes';

// OpenCVHelper will be the helper class that does a whole bunch of god calculations for
// GraphicsCore.
export class OpenCVHelper {
	static newOpenCVHelper() {
		return new OpenCVHelper();
	}

	private videoEl: React.RefObject<HTMLVideoElement> | undefined = undefined;
	private height: number | undefined = undefined;
	private width: number | undefined = undefined;
	private cvVideoCapture: any = undefined;
	private cvSource: any = undefined;
	private cvDestination: any = undefined;
	private cvHSV: any = undefined;
	private cvHSVSelectColor: PixelHSV | undefined = undefined;
	private highlightColor: HighlightColor = HIGHLIGHT_COLORS.RED;
	private shape: Shapes = Shapes.CIRCLE;
	private canvasElCurrent: HTMLCanvasElement | undefined = undefined;
	private canvasEl2Current: HTMLCanvasElement | undefined = undefined;

	constructor(
		private cv = window.cv
	) { }

	public setVideoEl(videoEl: React.RefObject<HTMLVideoElement>, height: number, width: number) {
		this.videoEl = videoEl;
		if (videoEl.current) {
			try {
				if (this.videoEl.current) {
					this.cvVideoCapture = new this.cv.VideoCapture(this.videoEl.current);
				}
				this.setHeightAndWidth(height, width);

				// Check for cv.Mat to prevent race condition	
				if (this.cv.Mat) {
					this.setSourceAndDestination(height, width);
				}
			} catch (e) {
				console.log("ERR: ", e);
			}
		}
	}

	public setSourceAndDestination(height: number, width: number) {
		this.setHeightAndWidth(height, width);
		this.cvSource = new this.cv.Mat(height, width, this.cv.CV_8UC4);
		this.cvDestination = new this.cv.Mat(height, width, this.cv.CV_8UC1);
		this.cvHSV = new this.cv.Mat();
	}

	public getHighlightColor(): HighlightColor {
		return this.highlightColor;
	}

	public setHighlightColor(highlightColor: HighlightColor) {
		this.highlightColor = highlightColor;
	}

	public getShape(): Shapes {
		return this.shape;
	}

	public setShape(shape: Shapes) {
		this.shape = shape;
	}

	public setHSVSelectColor(cvHSVSelectColor: PixelHSV) {
		this.cvHSVSelectColor = cvHSVSelectColor;
	}

	public setCanvasElCurrent(canvasElCurrent: HTMLCanvasElement, canvasEl2Current: HTMLCanvasElement) {
		if (!this.canvasElCurrent) {
			this.canvasElCurrent = canvasElCurrent;
		}

		if (!this.canvasEl2Current) {
			this.canvasEl2Current = canvasEl2Current;
		}
	}

	public getLatestVideoFrame() {
		if (!this.videoEl || !this.videoEl.current) {
			throw new Error("Video is not provided");
		}

		return this.videoEl.current;
	}

	public getFrameAsImage() {
		const image = this.canvasElCurrent?.toDataURL("image/png");
		const link = document.createElement('a');
		link.download = `ScreenCapture${(new Date()).toISOString()}.png`;
		link.href = image!;
		link.click();
	}

	public draw(
		context: CanvasRenderingContext2D,
		canvasElCurrent: HTMLCanvasElement,
		context2: CanvasRenderingContext2D,
		canvasEl2Current: HTMLCanvasElement,
		imageData: ImageData
	) {
		if (
			!this.cv.Mat
			|| !this.cv.MatVector
			|| !this.cvVideoCapture
			|| !this.cvDestination
			|| !this.cvHSVSelectColor
			|| !this.cvHSV
			|| !this.cvSource
			|| !this.height
			|| !this.width
		) {
			return;
		}

		// use contrasted version to get contours
		const source = this.cv.matFromImageData(imageData);
		const lowerHSV = GraphicsManipulator.GetHsvFormatted(this.cvHSVSelectColor, -HSV_THRESHOLD, 0);
		const higherHSV = GraphicsManipulator.GetHsvFormatted(this.cvHSVSelectColor, HSV_THRESHOLD, 255);
		this.cv.cvtColor(source, this.cvHSV, this.cv.COLOR_RGB2HSV);

		const low = new this.cv.Mat(
			this.cvHSV.rows,
			this.cvHSV.cols,
			this.cvHSV.type(),
			lowerHSV
		);
		const high = new this.cv.Mat(
			this.cvHSV.rows,
			this.cvHSV.cols,
			this.cvHSV.type(),
			higherHSV
		);
		this.cv.inRange(this.cvHSV, low, high, this.cvHSV);

		const contours = new this.cv.MatVector();
		const hierarchy = new this.cv.Mat();
		this.cv.findContours(
			this.cvHSV,
			contours,
			hierarchy,
			this.cv.RETR_LIST,
			this.cv.CHAIN_APPROX_SIMPLE
		);
		const groupedContoursAsRectangles = this.groupContoursAsRectangles(contours);

		switch (this.shape) {
			case Shapes.RECTANGLE: {
				this.drawRect(groupedContoursAsRectangles, context);
				break;
			}
			case Shapes.CIRCLE: {
				this.drawCircle(groupedContoursAsRectangles, context);
				break;
			}
			default: {
				break;
			}
		}

		// Clear memory and unused variables
		source.delete();
		this.cvHSV.delete();
		this.cvHSV = new this.cv.Mat();
		low.delete();
		high.delete();
		contours.delete();
		hierarchy.delete();
		groupedContoursAsRectangles.delete();
	}

	private setHeightAndWidth(height: number, width: number) {
		this.height = height;
		this.width = width;
	}

	private groupContoursAsRectangles(contours: any) {
		const contoursAsRectangles = new this.cv.RectVector();
		const weights = new this.cv.IntVector();

		for (let i = 0; i < contours.size(); i++) {
			const obj = contours.get(i);
			const rect = this.cv.boundingRect(obj);
			contoursAsRectangles.push_back(rect);
			contoursAsRectangles.push_back(rect);
		}
		this.cv.groupRectangles(contoursAsRectangles, weights, 1, 2);
		weights.delete();
		return contoursAsRectangles;
	}

	private drawRect(contoursAsRectangles: any, context: CanvasRenderingContext2D) {
		for (let i = 0; i < contoursAsRectangles.size(); i++) {
			const rect = contoursAsRectangles.get(i);
			if (rect.width > BORDER_THRESHOLD && rect.height > BORDER_THRESHOLD) {
				context.beginPath();
				context.lineWidth = RECTANGLE_LINE_WIDTH;
				context.strokeStyle = this.highlightColor;
				context.rect(rect.x, rect.y, rect.width, rect.height);
				context.stroke();
			}
		}
	}

	private drawCircle(contoursAsRectangles: any, context: CanvasRenderingContext2D) {
		for (let i = 0; i < contoursAsRectangles.size(); i++) {
			const rect = contoursAsRectangles.get(i);
			const radius = Math.max(rect.width, rect.height) / 2;
			const centerX = rect.x + rect.width / 2;
			const centerY = rect.y + rect.height / 2;
			if (rect.width > BORDER_THRESHOLD && rect.height > BORDER_THRESHOLD) {
				context.beginPath();
				context.lineWidth = CIRCLE_LINE_WIDTH;
				context.strokeStyle = this.highlightColor;
				context.ellipse(centerX, centerY, radius, radius, 0, 0, 360);
				context.stroke();
			}
		}
	}
}