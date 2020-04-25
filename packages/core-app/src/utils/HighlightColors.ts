// HighlightColors is the highlight outline colors.
export const HIGHLIGHT_COLORS: HighlightColors = {
	RED: [255, 0, 0, 255],
	BLACK: [0, 0, 0, 255],
	WHITE: [255, 255, 255, 255],
	GREEN: [0, 255, 0, 255],
	BLUE: [0, 0, 255, 255],
	PURPLE: [102, 0, 204, 255],
	YELLOW: [255, 255, 51, 255],
	ORANGE: [255, 153, 51, 255]
}

export type HighlightColors = {
	[color: string]: HighlightColor
}

export type HighlightColor = [number, number, number, number]