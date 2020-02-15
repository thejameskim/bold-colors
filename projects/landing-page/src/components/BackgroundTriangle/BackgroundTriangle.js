import React from 'react';
import { MAIN_COLOR } from '../../utils/constants/COLOR';

/**
 * BackgroundTriangle is the background's triangle thing
 * 
 * @param {{height: number, 
 * color: string, 
 * otherBGColor: string,
 * direction: "TOP_LEFT" | "TOP_RIGHT" | "BOTTOM_LEFT" | "BOTTOM_RIGHT"}} param0 
 */
export function BackgroundTriangle({
	height,
	color = MAIN_COLOR,
	otherBGColor = "#fff",
	direction,
	styleIn
}) {
	let finalDirection = "";

	switch (direction) {
		case "TOP_LEFT":
			finalDirection = "top left";
			break;
		case "TOP_RIGHT":
			finalDirection = "top right";
			break;
		case "BOTTOM_LEFT":
			finalDirection = "bottom left";
			break;
		default:
			finalDirection = "bottom right";
			break;
	}

	let style = {
		height,
		color,
		width: '100%',
		background: `linear-gradient(to ${finalDirection}, ${otherBGColor} 0%, ${otherBGColor} 50%, ${color} 50%, ${color} 100%`,
		zIndex: -5555
	}

	if (styleIn) {
		style = {
			...style,
			...styleIn
		}
	}

	return <div style={style}>
	</div>
}