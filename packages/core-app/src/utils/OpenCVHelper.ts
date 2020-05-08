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

	public setHighlightColor(highlightColor: HighlightColor) {
		this.highlightColor = highlightColor;
	}

	public setShape(shape: Shapes) {
		this.shape = shape;
	}

	public setHSVSelectColor(cvHSVSelectColor: PixelHSV) {
		this.cvHSVSelectColor = cvHSVSelectColor;
	}

	public setCanvasElCurrent(canvasElCurrent: HTMLCanvasElement) {
		if (!this.canvasElCurrent) {
			this.canvasElCurrent = canvasElCurrent;
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

	public draw(context: CanvasRenderingContext2D, canvasElCurrent: HTMLCanvasElement) {
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

		this.cvVideoCapture.read(this.cvSource);
		this.cvSource.copyTo(this.cvDestination);

		const lowerHSV = GraphicsManipulator.GetHsvFormatted(this.cvHSVSelectColor, -HSV_THRESHOLD, 0);
		const higherHSV = GraphicsManipulator.GetHsvFormatted(this.cvHSVSelectColor, HSV_THRESHOLD, 255);

		this.cv.cvtColor(this.cvSource, this.cvHSV, this.cv.COLOR_RGB2HSV);
		this.cvSource.convertTo(this.cvSource, -1, 2, 0);
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
				this.drawRect(groupedContoursAsRectangles);
				break;
			}
			case Shapes.CIRCLE: {
				this.drawCircle(groupedContoursAsRectangles);
				break;
			}
			default: {
				break;
			}
		}

		this.cv.imshow(canvasElCurrent, this.cvDestination);

		// Clear memory and unused variables
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
		this.cv.groupRectangles(contoursAsRectangles, weights, 1, 0.8);
		weights.delete();
		return contoursAsRectangles;
	}

	private drawRect(contoursAsRectangles: any) {
		for (let i = 0; i < contoursAsRectangles.size(); i++) {
			const rect = contoursAsRectangles.get(i);
			const p1 = new this.cv.Point(rect.x, rect.y);
			const p2 = new this.cv.Point(rect.x + rect.width, rect.y + rect.height);

			if (rect.width > BORDER_THRESHOLD && rect.height > BORDER_THRESHOLD) {
				this.cv.rectangle(this.cvDestination, p1, p2, this.highlightColor, RECTANGLE_LINE_WIDTH, LINE_TYPE);
			}
		}
	}

	private drawCircle(contoursAsRectangles: any) {
		for (let i = 0; i < contoursAsRectangles.size(); i++) {
			const rect = contoursAsRectangles.get(i);
			const radius = Math.max(rect.width, rect.height) / 2;
			const centerX = rect.x + rect.width / 2;
			const centerY = rect.y + rect.height / 2;
			const center = new this.cv.Point(centerX, centerY);
			if (rect.width > BORDER_THRESHOLD && rect.height > BORDER_THRESHOLD) {
				this.cv.circle(this.cvDestination, center, radius, this.highlightColor, CIRCLE_LINE_WIDTH, LINE_TYPE);
			}
		}
	}
}