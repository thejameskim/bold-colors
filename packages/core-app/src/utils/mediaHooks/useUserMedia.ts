import { useState, useEffect } from 'react';
import { ReactStateSetter } from '../CallbackType';

// useUserMedia is inspired by
// https://blog.logrocket.com/responsive-camera-component-react-hooks/

export const USER_MEDIA_CAPTURE_OPTIONS: MediaStreamConstraints = {
	video: {
		facingMode: "environment",
		width: {
			exact: 1280
		},
		height: {
			exact: 720
		}
	}
}

export const useUserMedia = (requestedMedia: MediaStreamConstraints) => {
	const [mediaStream, setMediaStream] = useState<MediaStream | null | undefined>(undefined);

	useEffect(() => {
		if (!mediaStream) {
			enableStream(requestedMedia, setMediaStream);
			return;
		}

		// Clean up and remove all media tracks
		return () => {
			mediaStream.getTracks().forEach((track) => {
				track.stop();
			})
		}
	}, [mediaStream, requestedMedia]);

	return mediaStream;
}

async function enableStream(
	requestedMedia: MediaStreamConstraints,
	setMediaStream: ReactStateSetter<MediaStream | null | undefined>
) {
	try {
		const stream = await navigator.mediaDevices.getUserMedia(requestedMedia);
		setMediaStream(stream);
	} catch (e) {
		setMediaStream(null);
	}
}