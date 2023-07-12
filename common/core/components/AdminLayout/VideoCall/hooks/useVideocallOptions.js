function useVideocallOptions({
	streams = {},
	setInACall = () => {},
	options = {},
	setOptions = () => {},
	setStreams = () => {},
}) {
	const stopStream = (stream_type) => {
		if (!streams[stream_type]) return;

		const tracks = streams[stream_type].getTracks();
		tracks.forEach((track) => {
			track.stop();
		});
	};

	const callEnd = () => {
		setInACall(false);
		stopStream('screen_stream');
		stopStream('user_stream');
	};

	const shareScreen = () => {
		if (options.isScreenShareActive) {
			setOptions((prev) => ({ ...prev, isScreenShareActive: false }));
			setStreams((prev) => ({ ...prev, screen_stream: null }));
			stopStream('screen_stream');
		} else {
			navigator.mediaDevices
				.getDisplayMedia({ cursor: true })
				.then((screenStream) => {
					setOptions((prev) => ({ ...prev, isScreenShareActive: true }));
					setStreams((prev) => ({ ...prev, screen_stream: screenStream }));
				})
				.catch((error) => {
					console.log('Failed to share screen', error);
				});
		}
	};

	const micOn = () => {
		if (options.isMicActive) {
			setOptions((prev) => ({ ...prev, isMicActive: false }));
		} else {
			setOptions((prev) => ({ ...prev, isMicActive: true }));
		}
	};

	const videoOn = () => {
		if (options.isVideoActive) {
			setOptions((prev) => ({ ...prev, isVideoActive: false }));
		} else {
			setOptions((prev) => ({ ...prev, isVideoActive: true }));
		}
	};

	return { videoOn, micOn, shareScreen, callEnd };
}

export default useVideocallOptions;
