import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useCallback } from 'react';

import { callUpdate } from '../utils/callFunctions';

function useVideocallOptions({
	toggleState,
	setToggleState,
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
		setToggleState((prev) => ({ ...prev, isMicActive: !prev.isMicActive }));
		const loaclStream = streams;
		if (loaclStream?.userStream) {
			loaclStream.userStream.getAudioTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !toggleState.isMicActive;
		}
	}, [toggleState.isMicActive, setToggleState, streams]);

	const toggleVideo = useCallback(({ e, clickType }) => {
		if (clickType === 'mini_screen') {
			e.stopPropagation();
		}
		setToggleState((prev) => ({ ...prev, isVideoActive: !prev.isVideoActive }));
		const loaclStream = streams;
		if (loaclStream?.userStream) {
			loaclStream.userStream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !toggleState.isVideoActive;
		}
	}, [toggleState.isVideoActive, setToggleState, streams]);

	return { stopCall, toggleMic, toggleVideo };
}

export default useVideocallOptions;
