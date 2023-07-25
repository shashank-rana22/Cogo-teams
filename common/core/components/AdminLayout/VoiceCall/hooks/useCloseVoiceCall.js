import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { setDoc, doc } from 'firebase/firestore';
import { useCallback, useRef, useState } from 'react';

const INTERVAL = 5000;
const DEBOUNCE_LIMIT = 1000;
const COUNTER_ZERO = 0;
const DEFAULT_ZERO = 0;
const INCREMENT_BY_ONE = 1;

const updateRoom = async ({ agentId, firestore }) => {
	const docRef = doc(
		firestore,
		`/users/${agentId}`,
	);

	setDoc(docRef, {
		last_activity_timestamp : Date.now(),
		last_activity           : 'call_end',
	}, { merge: true });
};

const useCloseVoiceCall = ({
	localStateReducer,
	voice_call_recipient_data,
	firestore,
}) => {
	const [counter, setCounter] = useState(DEFAULT_ZERO);
	const apiCallIntervalRef = useRef(null);
	const counterIntervalRef = useRef(null);

	const dispatch = useDispatch();
	const { userId = '', orgId = '', loggedInAgentId = '' } = voice_call_recipient_data || {};

	const clearApiInterval = useCallback(() => {
		clearInterval(apiCallIntervalRef.current);
	}, []);

	const stopSecsCounter = useCallback(() => {
		setCounter(COUNTER_ZERO);
		clearInterval(counterIntervalRef.current);
	}, []);

	const startApiCallInterval = useCallback((intervalFunc = () => {}) => {
		apiCallIntervalRef.current = setInterval(intervalFunc, INTERVAL);
	}, []);

	const startSecsCounter = useCallback(() => {
		counterIntervalRef.current = setInterval(() => {
			setCounter((prevCounter) => prevCounter + INCREMENT_BY_ONE);
		}, DEBOUNCE_LIMIT);
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
		updateRoom({ agentId: loggedInAgentId, firestore });
	}, [dispatch, localStateReducer, loggedInAgentId, firestore]);

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
