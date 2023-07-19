import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useCallback } from 'react';

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
	const shareScreen = useCallback(() => {
		if (options.shareScreen) {
			console.log('request share screen');
		} else {
			console.log('request share screen');
		}
	}, [options.shareScreen]);

	const stopCall = () => {
		callEnd();
		callUpdate({ call_status: 'end_call' });
	};

	const micOn = useCallback(() => {
		setOptions((prev) => ({ ...prev, isMicActive: !options.isMicActive }));
		const loaclStream = streams;
		if (loaclStream?.user_stream) {
			loaclStream.user_stream.getAudioTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !options.isMicActive;
		}
	}, [options.isMicActive, setOptions, streams]);

	const videoOn = useCallback(() => {
		if (options.isVideoActive) {
			peerRef.current.removeTrack(
				streams.video_stream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index],
				streams.user_stream,
			);
			stopStream('video_stream', streams);
			setStreams((prev) => ({ ...prev, video_stream: null }));
		} else {
			navigator.mediaDevices
				.getUserMedia({
					video: true,
				})
				.then((videoStream) => {
					setStreams((prev) => ({ ...prev, video_stream: videoStream }));
					peerRef.current.addTrack(
						videoStream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index],
						streams.user_stream,
					);
				});
		}
		setOptions((prev) => ({ ...prev, isVideoActive: !options.isVideoActive }));
	}, [options.isVideoActive, peerRef, setOptions, setStreams, streams]);

	return { shareScreen, stopCall, micOn, videoOn };
}

export default useVideocallOptions;
