import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback, useRef, useState } from 'react';

const API_CALL_INTERVAL = 5000;
const CONSTANT_COUNTER = 1;
const HOOK_INTERVAL = 1000;

const useCloseVoiceCall = ({
	localStateReducer,
	voice_call_recipient_data,
}) => {
	const [counter, setCounter] = useState(GLOBAL_CONSTANTS.zeroth_index);
	const apiCallIntervalRef = useRef(null);
	const counterIntervalRef = useRef(null);

	const dispatch = useDispatch();
	const { userId = '', orgId = '' } = voice_call_recipient_data || {};

	const clearApiInterval = useCallback(() => {
		clearInterval(apiCallIntervalRef.current);
	}, []);

	const stopSecsCounter = useCallback(() => {
		setCounter(GLOBAL_CONSTANTS.zeroth_index);
		clearInterval(counterIntervalRef.current);
	}, []);

	const startApiCallInterval = useCallback((intervalFunc = () => {}) => {
		apiCallIntervalRef.current = setInterval(intervalFunc, API_CALL_INTERVAL);
	}, []);

	const startSecsCounter = useCallback(() => {
		counterIntervalRef.current = setInterval(() => {
			setCounter((prevCounter) => prevCounter + CONSTANT_COUNTER);
		}, HOOK_INTERVAL);
	}, []);

	const unmountVoiceCall = useCallback(() => {
		localStateReducer({
			showCallModalType    : '',
			status               : '',
			attendees            : [],
			callRecordId         : '',
			callId               : '',
			hasAgentPickedCall   : false,
			latestAddedAgentName : '',
			voiceCallEndAt       : null,
		});
		dispatch(
			setProfileState({
				voice_call_recipient_data : {},
				is_in_voice_call          : false,
			}),
		);
	}, [dispatch, localStateReducer]);

	const checkToOpenFeedBack = useCallback(({ hasAgentPickedCall = false }) => {
		stopSecsCounter();
		clearInterval(apiCallIntervalRef.current);
		if (orgId && userId && hasAgentPickedCall) {
			localStateReducer({
				showCallModalType : 'feedbackModal',
				voiceCallEndAt    : new Date(),
			});
			return;
		}
		unmountVoiceCall();
	}, [localStateReducer, orgId, unmountVoiceCall, userId, stopSecsCounter]);

	return {
		unmountVoiceCall,
		checkToOpenFeedBack,
		startApiCallInterval,
		clearApiInterval,
		startSecsCounter,
		stopSecsCounter,
		counter,
	};
};
export default useCloseVoiceCall;
