import { useEffect, useState, useCallback } from 'react';

import CallModal from './CallModal';
import FeedbackModal from './FeedBackModal';
import useCloseVoiceCall from './hooks/useCloseVoiceCall';
import useHangUpCall from './hooks/useHangUpCall';
import useOutgoingCall from './hooks/useOutgoingCall';
import useOutgoingStatusCall from './hooks/useOutgoingStatusCall';
import useUpdateLiveCallStatus from './hooks/useUpdateLiveCallStatus';
import MinimizeCallModal from './MinimizeModal';

function VoiceCall({ voice_call_recipient_data = {}, inCall = false }) {
	const [localCallState, setLocalCallState] = useState({
		showCallModalType    : '',
		status               : '',
		attendees            : [],
		callRecordId         : '',
		callId               : '',
		hasAgentPickedCall   : false,
		latestAddedAgentName : '',
		voiceCallEndAt       : null,
	});

	const localStateReducer = useCallback((val = {}) => {
		setLocalCallState((p) => ({ ...p, ...val }));
	}, []);

	const {
		showCallModalType = '',
		status = '',
		callId = '',
		latestAddedAgentName = '',
		callRecordId,
		attendees = [],
		hasAgentPickedCall = false,
	} = localCallState || {};

	const {
		unmountVoiceCall,
		checkToOpenFeedBack,
		clearApiInterval,
		startApiCallInterval,
		startSecsCounter,
		stopSecsCounter,
		counter,
	} = useCloseVoiceCall({ localStateReducer, voice_call_recipient_data });

	const { fetchCallStatus = () => {} } = useOutgoingStatusCall({
		setLocalCallState,
		checkToOpenFeedBack,
		localStateReducer,
		clearApiInterval,
	});

	const { makeCallApi = () => {}, callLoading } = useOutgoingCall({
		voice_call_recipient_data,
		checkToOpenFeedBack,
		localStateReducer,
		startApiCallInterval,
		fetchCallStatus,
	});

	const { updateLiveCallStatus, updateLiveCallStatusLoading } = useUpdateLiveCallStatus({
		callId,
		latestAddedAgentName,
		setLocalCallState,
		checkToOpenFeedBack,
	});

	const {
		hangUpCall = () => {},
		hangUpLoading,
	} = useHangUpCall({
		callRecordId,
		hasAgentPickedCall,
		checkToOpenFeedBack,
	});

	useEffect(() => {
		if (inCall) {
			localStateReducer({ showCallModalType: 'fullCallModal' });
			makeCallApi();
		}

		return clearApiInterval;
	}, [
		makeCallApi,
		clearApiInterval,
		inCall,
		localStateReducer,
	]);

	useEffect(() => {
		if (status === 'in_progress') {
			startSecsCounter();
		}
		return stopSecsCounter;
	}, [status, startSecsCounter, stopSecsCounter]);

	return (
		<>
			{showCallModalType === 'fullCallModal' && (
				<CallModal
					voice_call_recipient_data={voice_call_recipient_data}
					status={status}
					callLoading={callLoading}
					updateLiveCallStatusLoading={updateLiveCallStatusLoading}
					updateLiveCallStatus={updateLiveCallStatus}
					localStateReducer={localStateReducer}
					counter={counter}
					hangUpCall={hangUpCall}
					hangUpLoading={hangUpLoading}
					attendees={attendees}
				/>
			)}
			{showCallModalType === 'feedbackModal' && (
				<FeedbackModal
					voice_call_recipient_data={voice_call_recipient_data}
					callEndAt={localCallState?.voiceCallEndAt}
					unmountVoiceCall={unmountVoiceCall}
				/>
			)}
			{showCallModalType === 'minimizedModal' && (
				<MinimizeCallModal
					voice_call_recipient_data={voice_call_recipient_data}
					status={status}
					callLoading={callLoading}
					counter={counter}
					hangUpCall={hangUpCall}
					hangUpLoading={hangUpLoading}
					localStateReducer={localStateReducer}
				/>
			)}
		</>
	);
}
export default VoiceCall;
