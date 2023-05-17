import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback, useRef, useState } from 'react';

const useCloseVoiceCall = ({
	localStateReducer,
	voice_call_recipient_data,
}) => {
	const [counter, setCounter] = useState(0);
	const apiCallIntervalRef = useRef(null);
	const counterIntervalRef = useRef(null);

	const dispatch = useDispatch();
	const { userId = '', orgId = '' } = voice_call_recipient_data || {};

	const clearApiInterval = useCallback(() => {
		clearInterval(apiCallIntervalRef.current);
	}, []);

	const stopSecsCounter = useCallback(() => {
		setCounter(0);
		clearInterval(counterIntervalRef.current);
	}, []);

	const startApiCallInterval = useCallback((intervalFunc = () => {}) => {
		apiCallIntervalRef.current = setInterval(intervalFunc, 5000);
	}, []);

	const startSecsCounter = useCallback(() => {
		counterIntervalRef.current = setInterval(() => {
			setCounter((prevCounter) => prevCounter + 1);
		}, 1000);
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
