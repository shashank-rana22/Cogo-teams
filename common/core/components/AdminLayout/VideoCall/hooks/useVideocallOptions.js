import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { stopStream } from '../utils';

function useVideocallOptions({
	options,
	setOptions,
	setStreams,
	streams,
	callEnd,
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
			stopStream('screen_stream', streams);
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

	const stopCall = () => {
		callEnd();
		callUpdate({ call_status: 'end_call' });
	};

	const micOn = () => {
		setOptions((prev) => ({ ...prev, isMicActive: !options.isMicActive }));
		const loaclStream = streams;
		if (loaclStream?.user) {
			loaclStream.user.getAudioTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = options.isMicActive;
		}
	};

	const videoOn = () => {
		stopStream('user_stream', streams);
		navigator.mediaDevices
			.getUserMedia({ video: !options.isVideoActive, audio: true })
			.then((userStream) => {
				console.log(userStream, 'in call user_stream');
				setStreams((prev) => ({ ...prev, user_stream: userStream }));
			})
			.catch((error) => {
				console.log('user stream is not working', error);
			});
		setOptions((prev) => ({ ...prev, isVideoActive: !options.isVideoActive }));
	};

	return { shareScreen, stopCall, micOn, videoOn };
}

export default useVideocallOptions;
