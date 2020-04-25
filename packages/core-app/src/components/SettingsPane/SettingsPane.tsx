import React from 'react';
import { Shapes } from '../../utils/Shapes';
import { OpenCVHelper } from '../../utils/OpenCVHelper';
import { HIGHLIGHT_COLORS } from '../../utils/HighlightColors';
import { ReactStateSetter } from '../../utils/CallbackType';

type SettingsPaneProps = {
	cvHelper: OpenCVHelper
}

const shapes: Shapes[] = [Shapes.CIRCLE, Shapes.RECTANGLE, Shapes.NONE];

// SettingsPane is the bottom bar. When settings are changed, it calls callback functions 
// provided within the props.
export const SettingsPane: React.FC<SettingsPaneProps> = ({
	cvHelper
}) => {
	const highlightColors = Object.keys(HIGHLIGHT_COLORS).map((color) => {
		return color;
	})
	return <div className="settings-pane">
		<div id="shapes-pane">
			<select onChange={(event) => {
				const selectedShape = shapes[event.target.selectedIndex];
				cvHelper.setShape(selectedShape);
			}}>
				{shapes.map((shape) => {
					return <option key={shape}>
						{shape}
					</option>
				})}
			</select>
		</div>
		<div id="camera-pane">
			<button onClick={() => {
				cvHelper.getFrameAsImage();
			}}>
				Take picture
			</button>
		</div>
		<div id="colors-pane">
			<select onChange={(event) => {
				const selectedColor = HIGHLIGHT_COLORS[highlightColors[event.target.selectedIndex]];
				cvHelper.setHighlightColor(selectedColor);
			}}>
				{highlightColors.map((color) => {
					return <option key={color}>
						{color.toLowerCase()}
					</option>
				})}
			</select>
		</div>
	</div>
}