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

	return { shareScreen, stopCall };
}

export default useVideocallOptions;
