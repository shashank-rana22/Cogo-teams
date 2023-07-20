import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useCallback } from 'react';

import { callUpdate } from '../utils';

// import { stopStream } from '../utils';

function useVideocallOptions({
	options,
	setOptions,
	streams,
	callEnd,
	callDetails,
	firestore,
}) {
	const stopCall = () => {
		callEnd();
		callUpdate({
			data: {
				call_status: 'end_call',
			},
			firestore,
			calling_room_id: callDetails?.calling_room_id,
		});
	};

	const micOn = useCallback(() => {
		setOptions((prev) => ({ ...prev, isMicActive: !prev.isMicActive }));
		const loaclStream = streams;
		if (loaclStream?.user_stream) {
			loaclStream.user_stream.getAudioTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !options.isMicActive;
		}
	}, [options.isMicActive, setOptions, streams]);

	const videoOn = useCallback(() => {
		setOptions((prev) => ({ ...prev, isVideoActive: !prev.isVideoActive }));
		const loaclStream = streams;
		if (loaclStream?.user_stream) {
			loaclStream.user_stream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !options.isVideoActive;
		}
	}, [options.isVideoActive, setOptions, streams]);

	return { stopCall, micOn, videoOn };
}

export default useVideocallOptions;
