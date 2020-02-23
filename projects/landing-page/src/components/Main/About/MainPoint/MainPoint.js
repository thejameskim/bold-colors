import React from 'react';
import { MAIN_FADE } from '../../../../utils/constants/FADE';
import './MainPoint.css';
import { CustomFade } from '../../../CustomFade/CustomFade';

export function MainPoint() {
	return <CustomFade duration={MAIN_FADE}>
		<div className="main-point">
			<div className="main-point-1">We care about</div>
			<div className="main-point-2">empowering you</div>
			<div className="main-point-3">to climb</div>
			<div className="main-point-4">The application highlights to its user, using CV detection, holds so colorblind climbers can differentiate between the different holds for each route.</div>
		</div>
	</CustomFade>
}