import { useEffect, useState } from 'react';
import { EnabledFeatures } from '../../_ENABLED_FEATURES/EnabledFeatures';

/**
 * useWindowHeight is the hook that will grab the window's width.
 */
export function useScrollPosition() {
	const [scrollPosition, setScrollPosition] = useState(window.scrollY);

	useEffect(() => {
		if (EnabledFeatures.Colorify) {
			window.addEventListener("scroll", () => {
				setScrollPosition(window.scrollY);
			});
		}

		return () => {
			window.removeEventListener("scroll");
		}
	}, [])

	return scrollPosition;
}