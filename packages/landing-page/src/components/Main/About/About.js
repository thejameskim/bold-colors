import React, { useContext } from 'react';
import './About.css';
import { GlobalContext } from '../../../utils/GlobalContext/GlobalContext';
import { viewportSizeIndex } from '../../../utils/isMobile/isMobile';
import { genQuadArr } from '../../../utils/generateQuadArray/generateQuadArray';
import { MAIN_COLOR } from '../../../utils/constants/COLOR';
import { BackgroundTriangle } from '../../BackgroundTriangle/BackgroundTriangle';
import { FloatingImage } from '../../FloatingImage/FloatingImage';
import * as background2 from '../../../assets/background-2.png';
import * as background2Circles from '../../../assets/background-2-circles.png';
import * as background3 from '../../../assets/background-3.png';
import * as background3Circles from '../../../assets/background-3-circles.png';

import * as iPhone from '../../../assets/iphone.png';
import * as outline2 from '../../../assets/outline-2.png';
import * as outline3 from '../../../assets/outline-3.png';
import * as outline4 from '../../../assets/outline-4.png';


import { MainPoint } from './MainPoint/MainPoint';
import { CustomFade } from '../../CustomFade/CustomFade';

const HEADER = "Why Bold Colors?";
const TEXT_DESCRIPTIONS = [
	{
		headline: "8% of the world population is colorblind.",
		description: "That doesn't seem like much, but that means that about 500 million people of the world deal with some sort of colorblindness.",
		textAlign: "right",
		marginRight: '0%',
		marginLeft: 'auto',
		marginTopBottom: genQuadArr(40),
		widthPercentage: genQuadArr(70),
		descWidthPercentage: genQuadArr(70),
		descMarginLeft: 'auto',
		descMarginRight: '0%',
		circlePosition: {
			width: [100, 100, 150, 200],
			widthPercentage: false,
			bottom: [20, 0, 0, 0],
			left: [-50, -50, -50, -25],
			positionPercentage: true
		}
	},
	{
		headline: "Navigating colored routes is challenging when you're colorblind.",
		description: "Climbing relies on colors to communicate a route to a climber. That is challenging with colorblindness.",
		textAlign: "left",
		marginRight: 'auto',
		marginLeft: '0%',
		marginTopBottom: genQuadArr(80),
		widthPercentage: genQuadArr(50),
		descWidthPercentage: genQuadArr(50),
		descMarginLeft: '0%',
		descMarginRight: 'auto',
		circlePosition: {
			width: [130, 130, 180, 300],
			widthPercentage: false,
			bottom: [20, 0, 0, -40],
			right: [-100, -100, -100, -100],
			positionPercentage: true
		}
	},
	{
		headline: "Current solutions are limiting.",
		description: "Current solutions involve patterned holds, additional tape, and partner assistance. Each solution has its own challenges and limit the climber in some manner.",
		textAlign: "right",
		marginRight: 'auto',
		marginLeft: '40%',
		marginTopBottom: genQuadArr(150),
		widthPercentage: genQuadArr(50),
		descWidthPercentage: genQuadArr(70),
		descMarginLeft: 'auto',
		descMarginRight: '0%',
		circlePosition: {
			width: [100, 140, 200, 350],
			widthPercentage: false,
			bottom: [20, 0, 0, -80],
			left: genQuadArr(-60),
			positionPercentage: true
		}
	},
	{
		headline: "Bold Colors roots for you.",
		description: "Bold colors empowers colorblind climbers to climb routes with ease. The application maps the route, emphasizing the pathway through methodologies that is clear and visible to someone who is colorblind. Allowing you the freedom to climbe with ease, independence, and without limitations.",
		textAlign: "left",
		marginRight: 'auto',
		marginLeft: '50%',
		marginTopBottom: genQuadArr(150),
		widthPercentage: genQuadArr(60),
		descWidthPercentage: genQuadArr(100),
		descMarginLeft: '0%',
		descMarginRight: 'auto',
		circlePosition: {
			width: [100, 100, 100, 150],
			widthPercentage: false,
			bottom: [-20, -20, -20, -20],
			left: [-70, -50, -40, -40],
			positionPercentage: true
		}
	},
];

const FEATURES = "Features";
const FEATURES_DESCRIPTION = [
	"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
	"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
	"Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ",
];

export function About() {
	const { windowWidth } = useContext(GlobalContext);
	const vpIndex = viewportSizeIndex(windowWidth);

	return <div className="about" id="about">
		<div className="about-inner">
			<div className="about-content">
				<h1 className="about-header">{HEADER}</h1>
				{TEXT_DESCRIPTIONS.map(desc => {
					const floatingCircleStyles = {
						position: "absolute",
						width: `${desc.circlePosition.width[vpIndex]}${desc.circlePosition.widthPercentage ? '%' : 'px'}`,
						height: `${desc.circlePosition.width[vpIndex]}${desc.circlePosition.widthPercentage ? '%' : 'px'}`,
						border: `5px dashed ${MAIN_COLOR}`,
						borderRadius: '50%'
					};

					if (desc.circlePosition.bottom) {
						floatingCircleStyles.bottom = `${desc.circlePosition.bottom[vpIndex]}${desc.circlePosition.positionPercentage ? '%' : 'px'}`;
					}

					if (desc.circlePosition.left) {
						floatingCircleStyles.left = `${desc.circlePosition.left[vpIndex]}${desc.circlePosition.positionPercentage ? '%' : 'px'}`
					}

					if (desc.circlePosition.right) {
						floatingCircleStyles.right = `${desc.circlePosition.right[vpIndex]}${desc.circlePosition.positionPercentage ? '%' : 'px'}`
					}

					if (desc.circlePosition.top) {
						floatingCircleStyles.top = `${desc.circlePosition.top[vpIndex]}${desc.circlePosition.positionPercentage ? '%' : 'px'}`
					}

					return <div className="about-item" key={desc.headline} style={{
						marginTop: desc.marginTopBottom[vpIndex],
						marginBottom: desc.marginTopBottom[vpIndex],
						width: `${desc.widthPercentage[vpIndex]}%`,
						marginLeft: desc.marginLeft,
						textAlign: desc.textAlign,
					}}>
						<h2>{desc.headline}</h2>
						<div style={{
							width: `${desc.descWidthPercentage[vpIndex]}%`,
							textAlign: desc.textAlign,
							marginLeft: desc.descMarginLeft,
							marginRight: desc.descMarginRight
						}}>
							<p>{desc.description}</p>
						</div>
						<CustomFade duration={2000}>
							<div className="about-floating-circle">
								<div style={floatingCircleStyles}></div>
							</div>
						</CustomFade>
					</div>
				})}
			</div>
			<div className="about-floating-circle">
				<div style={{
					positionPercentage: true,
					position: "absolute",
					width: `${[100, 200, 250, 400][vpIndex]}px`,
					height: `${[100, 200, 250, 400][vpIndex]}px`,
					border: `5px dashed ${MAIN_COLOR}`,
					right: `${[20, 20, 20, 20][vpIndex]}%`,
					borderRadius: '50%'
				}}></div>
			</div>
			{/** Climber */}
			<div style={{ position: 'relative' }}>
				<FloatingImage image={{
					image: background2,
					secondaryImage: background2Circles,
					width: [200, 200, 200, 550],
					widthPercentage: false,
					top: [20, 20, 20, -150],
					left: [20, 50, 50, 150]
				}} vpIndex={vpIndex} fadeDuration={1000} />
			</div>
			{/** White outline 1 - top */}
			<div style={{ position: 'relative' }}>
				<FloatingImage image={{
					secondaryImage: outline3,
					width: [200, 400, 400, 600],
					widthPercentage: false,
					top: [250, 100, 200, 350],
					right: [0, 50, 50, 150]
				}} vpIndex={vpIndex} />
			</div>
			{/** White outline 2 - left */}
			<div style={{ position: 'relative' }}>
				<FloatingImage image={{
					secondaryImage: outline2,
					width: [200, 400, 400, 600],
					widthPercentage: false,
					left: [-150, -300, -250, -400],
					top: [600, 500, 800, 1300]
				}} vpIndex={vpIndex} />
			</div>
			{/** White outline 3 - right */}
			<div style={{ position: 'relative' }}>
				<FloatingImage image={{
					secondaryImage: outline4,
					width: [200, 400, 400, 600],
					widthPercentage: false,
					right: [-150, -300, -250, -400],
					top: [800, 700, 1000, 1300]
				}} vpIndex={vpIndex} />
			</div>
			{/** Climber 2 - bottom */}
			<div style={{ position: 'relative' }}>
				<FloatingImage image={{
					image: background3,
					secondaryImage: background3Circles,
					width: [400, 400, 500, 700],
					widthPercentage: false,
					right: [-50, 0, 0, -70],
					top: [1100, 1100, 1300, 1800]
				}} vpIndex={vpIndex} />
			</div>
			<BackgroundTriangle
				height={[400, 400, 500, 800][vpIndex]}
				direction="BOTTOM_LEFT"
			/>
			<div className="about-features-inner">
				<div className="about-features-inner-inner">
					<div className="about-features-content bright-text">
						<h1>{FEATURES}</h1>
						{FEATURES_DESCRIPTION.map((desc, i) => <p key={i}>{desc}</p>)}
					</div>
					<div className="about-features-iphone">
						<img src={iPhone} style={{
							width: '80%',
							height: 'auto'
						}} alt="" />
					</div>
				</div>
				<MainPoint />
			</div>
			<BackgroundTriangle
				height={[300, 300, 400, 600][vpIndex]}
				direction={"TOP_LEFT"}
			/>
		</div>
	</div>
}