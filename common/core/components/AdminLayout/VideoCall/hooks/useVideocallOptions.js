import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function useVideocallOptions({
	options,
	setOptions,
	setStreams,
	streams,
	callEnd,
	stopStream,
	callUpdate,
	peerRef,
}) {
	const shareScreen = () => {
		if (options.isScreenShareActive) {
			setOptions((prev) => ({ ...prev, isScreenShareActive: false }));
			setStreams((prev) => ({ ...prev, screen_stream: null }));
			peerRef.current.replaceTrack(
				streams.screen_stream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index],
				streams.user_stream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index],
				streams.user_stream,
			);
			stopStream('screen_stream');
		} else {
			navigator.mediaDevices
				.getDisplayMedia({ cursor: true })
				.then((screenStream) => {
					setOptions((prev) => ({ ...prev, isScreenShareActive: true }));
					setStreams((prev) => ({ ...prev, screen_stream: screenStream }));
					peerRef.current.replaceTrack(
						streams.user_stream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index],
						screenStream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index],
						streams.user_stream,
					);
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
		stopStream('user_stream');
		navigator.mediaDevices
			.getUserMedia({ video: !options.isVideoActive, audio: true }).then((userStream) => {
				setStreams((prev) => ({ ...prev, user_stream: userStream }));
			}).catch((error) => {
				console.log('user stream is not working', error);
			});
		setOptions((prev) => ({ ...prev, isVideoActive: !options.isVideoActive }));
	};

	const stopCall = () => {
		callEnd();
		callUpdate({ call_status: 'end_call' });
	};

	return { videoOn, micOn, shareScreen, callEnd, stopCall };
}

export default useVideocallOptions;
