import React, { useContext } from 'react';
import './NavigationBar.css';
import { GlobalContext } from '../../../utils/GlobalContext/GlobalContext';
import { isMobile } from '../../../utils/isMobile/isMobile';
import { MAIN_FADE } from '../../../utils/constants/FADE';
import { CustomFade } from '../../CustomFade/CustomFade';

export function NavigationBar() {
	const { windowWidth } = useContext(GlobalContext);
	const mobile = isMobile(windowWidth);

	const navbarLinks = [
		{
			title: "Home",
			link: "#home"
		},
		{
			title: "About",
			link: "#about"
		},
		{
			title: "Team",
			link: "#team"
		},
		{
			title: "Contact",
			link: "#contact"
		}
	]

	return <div className="navbar" id="home">
		<div className="navbar-inner">
			<CustomFade left duration={MAIN_FADE}><div className="navbar-logo">Bold Colors</div></CustomFade>
			{!mobile &&
				<div className="navbar-links">
					{navbarLinks.map(link => <a key={link.link} href={link.link}>{link.title}</a>)}
				</div>
			}
		</div>
	</div>
}