import React, { useContext } from 'react';
import './Headline.css';
import * as mainImage from '../../../assets/main-image.png';
import * as mainImageCircles from '../../../assets/main-image-circles.png';
import * as background1 from '../../../assets/background-1.png';
import * as background1Circles from '../../../assets/background-1-circles.png';
import * as outline1 from '../../../assets/outline-1.png';
import { GlobalContext } from '../../../utils/GlobalContext/GlobalContext';
import { viewportSizeIndex } from '../../../utils/isMobile/isMobile';
import { BackgroundTriangle } from '../../BackgroundTriangle/BackgroundTriangle';
import { FloatingImage } from '../../FloatingImage/FloatingImage';
import { genQuadArr } from '../../../utils/generateQuadArray/generateQuadArray';
import { MAIN_FADE } from '../../../utils/constants/FADE';
import { CustomFade } from '../../CustomFade/CustomFade';

const HEADLINE_MAIN = "See the route a new type of way";
const SUB_TEXT = "What is bold colors?";
const DESCRIPTION = "A route planning application to empower colorblind rock climbers in their next adventure";
const BUTTON_TEXT = "Show me the Route";
const BUTTON_LINK = "/app";

const IMAGES = [
	{
		image: mainImage,
		secondaryImage: mainImageCircles,
		width: [300, 400, 500, 900],
		widthPercentage: false,
		bottom: [-200, -250, -300, -300],
		right: [-50, 0, 0, 0],
	},
	{
		image: background1,
		secondaryImage: background1Circles,
		width: [200, 300, 400, 700],
		widthPercentage: false,
		bottom: [-250, -300, -400, -460],
		left: genQuadArr(-70)
	},
	{
		secondaryImage: outline1,
		width: [200, 300, 400, 600],
		widthPercentage: false,
		top: [-200, -300, -370, -450],
		right: [40, 60, 100, 140]
	}
]

export function Headline() {
	const { windowWidth } = useContext(GlobalContext);
	const vpIndex = viewportSizeIndex(windowWidth);

	return <div className="headline">
		<div className="headline-inner">
			{IMAGES.map((img, i) => {
				return <FloatingImage key={i} image={img} vpIndex={vpIndex} fadeDuration={img.image ? 1000 : 1} />
			})}
			<div className="headline-content">
				<CustomFade left cascade duration={MAIN_FADE}>
					<div className="headline-text-group">
						<h1 className="headline-main">{HEADLINE_MAIN}</h1>
						<h3 className="headline-sub-text">{SUB_TEXT}</h3>
						<p className="headline-description">{DESCRIPTION}</p>
						<a href={BUTTON_LINK}><button className="headline-button">{BUTTON_TEXT}</button></a>
					</div>
				</CustomFade>
			</div>
		</div>
		<BackgroundTriangle
			height={[200, 200, 300, 320][vpIndex]}
			direction="TOP_LEFT"
		/>
	</div>
}