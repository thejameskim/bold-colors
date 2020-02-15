import { LARGE_WIDTH, SMALL_WIDTH, MEDIUM_WIDTH, EXTRA_LARGE_WIDTH } from "../constants/SIZE";

export function isMobile(width) {
	return width < LARGE_WIDTH;
}

export function viewportSizeIndex(width) {
	const indices = [SMALL_WIDTH, MEDIUM_WIDTH, LARGE_WIDTH, EXTRA_LARGE_WIDTH];
	for (let i = 0; i < indices.length; i++) {
		if (width <= indices[i]) {
			return i;
		}
	}
	return indices.length - 1;
}