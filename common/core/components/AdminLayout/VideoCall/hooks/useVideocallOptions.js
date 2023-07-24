import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useCallback } from 'react';

import { callUpdate } from '../utils/callFunctions';

function useVideocallOptions({
	options,
	setOptions,
	streams,
	callEnd,
	callDetails,
	firestore,
}) {
	const stopCall = useCallback(({ e, clickType }) => {
		if (clickType === 'mini_screen') {
			e.stopPropagation();
		}
		callEnd();
		callUpdate({
			data: {
				call_status: 'end_call',
			},
			firestore,
			callingRoomId: callDetails?.callingRoomId,
		});
	}, [callDetails?.callingRoomId, callEnd, firestore]);

	const toggleMic = useCallback(({ e, clickType }) => {
		if (clickType === 'mini_screen') {
			e.stopPropagation();
		}
		setOptions((prev) => ({ ...prev, isMicActive: !prev.isMicActive }));
		const loaclStream = streams;
		if (loaclStream?.userStream) {
			loaclStream.userStream.getAudioTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !options.isMicActive;
		}
	}, [options.isMicActive, setOptions, streams]);

	const toggleVideo = useCallback(({ e, clickType }) => {
		if (clickType === 'mini_screen') {
			e.stopPropagation();
		}
		setOptions((prev) => ({ ...prev, isVideoActive: !prev.isVideoActive }));
		const loaclStream = streams;
		if (loaclStream?.userStream) {
			loaclStream.userStream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !options.isVideoActive;
		}
	}, [options.isVideoActive, setOptions, streams]);

	return { stopCall, toggleMic, toggleVideo };
}

export default useVideocallOptions;
