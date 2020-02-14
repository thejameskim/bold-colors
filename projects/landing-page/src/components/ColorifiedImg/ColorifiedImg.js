import React, { useContext } from 'react';
import { EnabledFeatures } from '../../_ENABLED_FEATURES/EnabledFeatures';
import { GlobalContext } from '../../utils/GlobalContext/GlobalContext';

/** 
 * Change this to make the "end" point of the colorification sooner or later
 * 
 */
const COLORIFICATION_CONSTANT = 0.05;

/** 
 * Colorify will apply a filter to the children that turns them into grayscaled components that
 * fill with color when scrolling down.
 * 
 * Usage: <ColorifiedImg src={"http://image.com/image.png"} alt={"alt text"} styles={{color: red}} />
 */
export function ColorifiedImg({ src, alt, styles }) {
	const { scrollPosition } = useContext(GlobalContext);
	const extraStyles = {};
	let percentageHeight = (scrollPosition / document.body.clientHeight) || 0;
	if (isNaN(percentageHeight)) {
		percentageHeight = 0;
	}

	percentageHeight += COLORIFICATION_CONSTANT;

	if (EnabledFeatures.Colorify) {
		extraStyles.filter = `grayscale(${1 - percentageHeight})`;
	}
	return <img src={src} alt={alt} style={{
		...styles,
		...extraStyles
	}} />
}