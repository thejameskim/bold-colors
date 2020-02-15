import React, { useContext } from 'react';
import './Footer.css';
import * as iSchoolLogo from '../../../assets/ischoollogo.png';
import { GlobalContext } from '../../../utils/GlobalContext/GlobalContext';
import { viewportSizeIndex } from '../../../utils/isMobile/isMobile';
import { FloatingImage } from '../../FloatingImage/FloatingImage';
import * as outline5 from '../../../assets/outline-5.png';
import * as outline6 from '../../../assets/outline-6.png';
import { genQuadArr } from '../../../utils/generateQuadArray/generateQuadArray';

const ISCHOOL_CAPSTONE_LINK = "https://ischool.uw.edu/capstone";
const ISCHOOL_LINK = "https://ischool.uw.edu/";

export function Footer() {
	const { windowWidth } = useContext(GlobalContext);
	const vpIndex = viewportSizeIndex(windowWidth);

	return <>
		<div className="footer">
			<div className="footer-inner">
				<div className="footer-content">
					<div className="footer-left">
						<p>This project is a part of the <a href={ISCHOOL_CAPSTONE_LINK}>Capstone Project course</a> at the <a href={ISCHOOL_LINK}>University of Washington Information School.</a></p>
						<p>&copy; 2020</p>
					</div>
					<div className="footer-right">
						<img src={iSchoolLogo} alt="iSchool Logo" />
					</div>
				</div>
			</div>
			{/** White outline 1 - top */}
			<div style={{ position: 'relative' }}>
				<FloatingImage image={{
					secondaryImage: outline5,
					width: [200, 400, 400, 600],
					widthPercentage: false,
					bottom: genQuadArr(0),
					left: [-20, -200, -200, -300]
				}} vpIndex={vpIndex} />
			</div>
			<div style={{ position: 'relative' }}>
				<FloatingImage image={{
					secondaryImage: outline6,
					width: [100, 250, 250, 400],
					widthPercentage: false,
					bottom: genQuadArr(30),
					right: [0, 0, 0, 0]
				}} vpIndex={vpIndex} />
			</div>
		</div>
	</>
}