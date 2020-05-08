import React, { useState, useRef, useEffect, } from 'react';
import { GraphicsCore } from './components/GraphicsCore/GraphicsCore';
import { SettingsPane } from './components/SettingsPane/SettingsPane';
import { useUserMedia, USER_MEDIA_CAPTURE_OPTIONS } from './utils/mediaHooks/useUserMedia';
import { OpenCVHelper } from './utils/OpenCVHelper';
import { NavBar } from './components/NavBar/NavBar';
import { Welcome } from './components/Welcome/Welcome';
import { HelpPane } from './components/HelpPane/HelpPane';
import './App.css';

const cvHelper = OpenCVHelper.newOpenCVHelper();

// App is the main app that holds functionality of everything
// 
// it does NOT control the state of the selected position. That is within GraphicsCore
const App: React.FC = () => {
	const [hideWelcome, setHideWelcome] = useState<Boolean>(false);
	const [hideSet, setHideSet] = useState<Boolean>(true);
	const [hideHelp, setHideHelp] = useState<Boolean>(true);

	const [height, setHeight] = useState<number>(window.innerHeight);
	const [width, setWidth] = useState<number>(window.innerWidth);
	const videoEl = useRef<HTMLVideoElement>(null);
	const mediaStream = useUserMedia(USER_MEDIA_CAPTURE_OPTIONS);

	useEffect(() => {
		window.addEventListener("resize", () => {
			setHeight(window.innerHeight);
			setWidth(window.innerWidth);
		})
	})

	if (videoEl) {
		cvHelper.setVideoEl(videoEl, height * 0.9, width);
	}

	if (
		mediaStream
		&& videoEl.current
		&& !videoEl.current.srcObject
	) {
		videoEl.current.srcObject = mediaStream;
	}

	return (
		<div className="main-app">
			<HelpPane hide={hideHelp} hideFunc={setHideHelp} windowWidth={width} windowHeight={height} />
			<Welcome hide={hideWelcome} />
			<GraphicsCore cvHelper={cvHelper} hideWelcome={hideWelcome} hideWelcomeFunc={setHideWelcome} />
			<SettingsPane cvHelper={cvHelper} hide={hideSet ? "hidden" : ""} setHide={setHideSet} />
			<div>
				<video
					autoPlay
					playsInline
					muted
					hidden
					onCanPlay={() => handleCanPlay(videoEl)}
					height={height * 0.9}
					width={width}
					ref={videoEl}
					id="video-el"
				/>
			</div>
			<NavBar cvHelper={cvHelper} height={height * 0.08} 
				setHideSetting={() => { setHideSet(!hideSet) }}
				setHideHelp={() => { setHideHelp(!hideHelp) }} />
		</div>
	);
}

// silently fails if cannot play video
function handleCanPlay(videoEl: React.RefObject<HTMLVideoElement>) {
	videoEl.current?.play();
}

export default App;
