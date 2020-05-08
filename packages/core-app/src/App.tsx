import React, { useState, useRef, useEffect, } from 'react';
import { GraphicsCore } from './components/GraphicsCore/GraphicsCore';
import { SettingsPane } from './components/SettingsPane/SettingsPane';
import { useUserMedia, USER_MEDIA_CAPTURE_OPTIONS } from './utils/mediaHooks/useUserMedia';
import { OpenCVHelper } from './utils/OpenCVHelper';
import './App.css';

const cvHelper = OpenCVHelper.newOpenCVHelper();

// App is the main app that holds functionality of everything
// 
// it does NOT control the state of the selected position. That is within GraphicsCore
const App: React.FC = () => {
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
			<GraphicsCore cvHelper={cvHelper} />
			<SettingsPane cvHelper={cvHelper} />
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
		</div>
	);
}

// silently fails if cannot play video
function handleCanPlay(videoEl: React.RefObject<HTMLVideoElement>) {
	videoEl.current?.play();
}

export default App;
