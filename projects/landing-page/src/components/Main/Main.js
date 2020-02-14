import React from 'react';
import { GlobalContext } from '../../utils/GlobalContext/GlobalContext';
import { useWindowWidth } from '../../utils/hooks/useWindowWidth';
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Headline } from './Headline/Headline';
import { Team } from './Team/Team';
import { Footer } from './Footer/Footer';

export function Main() {
	const windowWidth = useWindowWidth();
	return <>
		<GlobalContext.Provider value={{
			windowWidth
		}}>
			<NavigationBar />
			<Headline />
			<Team />
			<Footer />
		</GlobalContext.Provider>
	</>
}