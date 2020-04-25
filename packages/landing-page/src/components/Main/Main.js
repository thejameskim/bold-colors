import React from 'react';
import { GlobalContext } from '../../utils/GlobalContext/GlobalContext';
import { useWindowWidth } from '../../utils/hooks/useWindowWidth';
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Headline } from './Headline/Headline';
import { Team } from './Team/Team';
import { Footer } from './Footer/Footer';
import { useScrollPosition } from '../../utils/hooks/useScrollPosition';
import { About } from './About/About';
import { LetsConnect } from './LetsConnect/LetsConnect';
// import fullImage from '../../assets/boldcolors.png';

export function Main() {
	const windowWidth = useWindowWidth();
	const scrollPosition = useScrollPosition();

	let test = [];
	for (let i = 0; i < 20; i++) {
		test.push(<br />);
	}

	return <>
		<GlobalContext.Provider value={{
			scrollPosition,
			windowWidth
		}}>
			<NavigationBar />
			<Headline />
			<About id="about" />
			<Team />
			<LetsConnect />
			<Footer />
		</GlobalContext.Provider>
	</>
}