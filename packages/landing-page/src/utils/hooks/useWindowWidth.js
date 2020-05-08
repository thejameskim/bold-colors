import { useEffect, useState } from 'react';

/**
 * useWindowWidth is the hook that will grab the window's width.
 */
export function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
		});
	}, [])

	return width;
}