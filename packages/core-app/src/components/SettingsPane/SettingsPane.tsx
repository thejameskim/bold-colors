import React, { useState } from 'react';
import { Shapes } from '../../utils/Shapes';
import { OpenCVHelper } from '../../utils/OpenCVHelper';
import { HIGHLIGHT_COLORS, HighlightColor } from '../../utils/HighlightColors';
import { ReactStateSetter } from '../../utils/CallbackType';
import './SettingsPane.css';

type SettingsPaneProps = {
	cvHelper: OpenCVHelper,
	hide: string,
	setHide: React.Dispatch<React.SetStateAction<Boolean>>
}

const shapes: Shapes[] = [Shapes.CIRCLE, Shapes.RECTANGLE, Shapes.NONE];
let prevHighlightColorIndex: number = 0;
let prevShapeIndex: number = 0;

// SettingsPane is the bottom bar. When settings are changed, it calls callback functions 
// provided within the props.
export const SettingsPane: React.FC<SettingsPaneProps> = ({
	cvHelper,
	hide,
	setHide
}) => {
	const[shapeIndex, setShapeIndex] = useState<number>(0);
	const[colorIndex, setColorIndex] = useState<number>(0);

	const highlightColors = Object.keys(HIGHLIGHT_COLORS).map((color) => {
		return color;
	})
	return <div className={"settings-pane " + hide}>
		<h1>Settings</h1>
		<div id="shapes-pane">
			<h2>Shape</h2>
			<select value={shapes[shapeIndex]} onChange={(event) => {
				const selectedShape = shapes[event.target.selectedIndex];
				cvHelper.setShape(selectedShape);
				setShapeIndex(event.target.selectedIndex);
			}}>
				{shapes.map((shape) => {
					return <option key={shape}>
						{shape}
					</option>
				})}
			</select>
		</div>
		<div id="colors-pane">
			<h2>Color</h2>
			<select value={highlightColors[colorIndex].toLowerCase()} onChange={(event) => {
				const selectedColor = HIGHLIGHT_COLORS[highlightColors[event.target.selectedIndex]];
				cvHelper.setHighlightColor(selectedColor);
				setColorIndex(event.target.selectedIndex);
			}}>
				{highlightColors.map((color) => {
					return <option key={color}>
						{color.toLowerCase()}
					</option>
				})}
			</select>
		</div>
		<div>
			<button onClick={() => {
				setHide(true);
				prevShapeIndex = shapeIndex;
				prevHighlightColorIndex = colorIndex;
			}}>Save</button>
			<button onClick={() => {
				const prevShape = shapes[prevShapeIndex];
				const prevColor = HIGHLIGHT_COLORS[highlightColors[prevHighlightColorIndex]];
				cvHelper.setShape(prevShape);
				cvHelper.setHighlightColor(prevColor);
				
				setColorIndex(prevHighlightColorIndex);
				setShapeIndex(prevShapeIndex);
				setHide(true);
			}}>Cancel</button>
		</div>
	</div>
}