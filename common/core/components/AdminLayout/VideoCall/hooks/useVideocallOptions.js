import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useCallback } from 'react';

import { callUpdate } from '../utils/callFunctions';

function useVideocallOptions({
	toggleState,
	setToggleState,
	streams,
	handleCallEnd,
	callDetails,
	firestore,
}) {
	const { callingRoomDetails } = callDetails;
	const { call_status: callStatus } = callingRoomDetails;

	const stopCall = useCallback(({ e, clickType, duration = 0 }) => {
		if (clickType === 'mini_screen') {
			e.stopPropagation();
		}

		if (callStatus === 'accepted') {
			handleCallEnd({ callActivity: 'answered', duration });
		} else {
			handleCallEnd({ callActivity: 'missed' });
		}

		callUpdate({
			data: {
				call_status: 'end_call',
			},
			firestore,
			callingRoomId: callDetails?.callingRoomId,
		});
	}, [callStatus, firestore, callDetails?.callingRoomId, handleCallEnd]);

	const toggleMic = useCallback(({ e, clickType }) => {
		if (clickType === 'mini_screen') {
			e.stopPropagation();
		}
		setToggleState((prev) => ({ ...prev, isMicActive: !prev.isMicActive }));
		const localStream = streams;
		if (localStream?.userStream) {
			localStream.userStream.getAudioTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !toggleState.isMicActive;
		}
	}, [toggleState.isMicActive, setToggleState, streams]);

	const toggleVideo = useCallback(({ e, clickType }) => {
		if (clickType === 'mini_screen') {
			e.stopPropagation();
		}
		setToggleState((prev) => ({ ...prev, isVideoActive: !prev.isVideoActive }));
		const localStream = streams;
		if (localStream?.userStream) {
			localStream.userStream.getVideoTracks()[GLOBAL_CONSTANTS.zeroth_index].enabled = !toggleState.isVideoActive;
		}
	}, [toggleState.isVideoActive, setToggleState, streams]);

	return { stopCall, toggleMic, toggleVideo };
}

export default useVideocallOptions;
