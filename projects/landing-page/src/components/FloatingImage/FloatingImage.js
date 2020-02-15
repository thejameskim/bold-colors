import React from 'react';
import './FloatingImage.css';
import { ColorifiedImg } from '../ColorifiedImg/ColorifiedImg';
import { FOREGROUND_PRIORITY } from '../../utils/constants/POSITION';
import { CustomFade } from '../CustomFade/CustomFade';

/**
 * FloatingImage are images floating in the background
 * @param {{
 * 		image: {
 * 			image?: string,
 * 			secondaryImage: string,
 *			width: number[],
 * 			widthPercentage: boolean,
 * 			bottom?: number[],
 * 			right?: number[]
 * 			left?: number[],
 * 			top?: number[]
 * 		},
 * 		vpIndex: number
 * } props 
 */
export function FloatingImage({
	image,
	vpIndex,
	fadeDuration
}) {
	const primaryStyle = {
		position: 'absolute',
		zIndex: 1,
		width: `${image.width[vpIndex]}${image.widthPercentage ? '%' : 'px'}`,
	}

	const secondaryStyle = {
		position: 'absolute',
		zIndex: FOREGROUND_PRIORITY,
		width: `${image.width[vpIndex]}${image.widthPercentage ? '%' : 'px'}`,
	}

	if (image.right) {
		primaryStyle.right = `${image.right[vpIndex]}px`;
		secondaryStyle.right = `${image.right[vpIndex]}px`;
	}

	if (image.bottom) {
		primaryStyle.bottom = `${image.bottom[vpIndex]}px`;
		secondaryStyle.bottom = `${image.bottom[vpIndex]}px`;
	}

	if (image.top) {
		primaryStyle.top = `${image.top[vpIndex]}px`;
		secondaryStyle.top = `${image.top[vpIndex]}px`;
	}

	if (image.left) {
		primaryStyle.left = `${image.left[vpIndex]}px`;
		secondaryStyle.left = `${image.left[vpIndex]}px`;
	}

	return <div className="floating-image">
		<CustomFade delay={fadeDuration / 2 || 0} duration={fadeDuration || 0}><img src={image.secondaryImage} style={secondaryStyle} alt="" /></CustomFade>
		{image.image && <ColorifiedImg src={image.image} styles={primaryStyle} alt="" />}
	</div>
}