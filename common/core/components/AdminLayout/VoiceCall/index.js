import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef, useState } from 'react';

import CallModal from './CallModal';
import FeedbackModal from './FeedBackModal';
import formatData from './helpers/formatData';
import { checkHangupStatus } from './helpers/hangupHelpers';
import useCloseVoiceCall from './hooks/useCloseVoiceCall';
import useFetchFirebaseRoom from './hooks/useFetchFirebase';
import useHangUpCall from './hooks/useHangUpCall';
import useOutgoingCall from './hooks/useOutgoingCall';
import useUpdateLiveCallStatus from './hooks/useUpdateLiveCallStatus';
import LogModal from './LogModal';
import MinimizeCallModal from './MinimizeModal';

const SECS_TO_MS = 1000;
const DEFAULT_SECS = 0;
const CALL_MODALS = ['fullCallModal', 'minimizedModal'];
const DECIMAL_PLACES = 0;

function VoiceCall({ firestore = {} }) {
	const {
		isInVoiceCall,
		voiceCallData,
		loggedInAgentId,
	} = useSelector(({ profile }) => ({
		isInVoiceCall   : profile?.is_in_voice_call,
		voiceCallData   : profile?.voice_call_recipient_data,
		loggedInAgentId : profile?.user?.id,
	}));

	const countdownRef = useRef(null);

	const [callState, setCallState] = useState({ showCallModalType: '' });
	const [callSecs, setCallSecs] = useState(DEFAULT_SECS);

	const {
		callDetails,
	} = useFetchFirebaseRoom({ firestore, agentId: loggedInAgentId });

	const {
		showCallModalType = '',
		receiverUserDetails = {},
		status = '',
		callStartAt = '',
		callId = '',
		attendees = [],
		callRecordId = '',
		callEndAt = '',
		conferenceType = '',
		voiceCallData: callData,
	} = callState || {};

	const {
		unmountVoiceCall,
		openFeedbackform,
	} = useCloseVoiceCall({ setCallState });

	const { makeCallApi = () => { }, callLoading } = useOutgoingCall({
		voiceCallData,
		setCallState,
		unmountVoiceCall,
		loggedInAgentId,
	});

	const { updateLiveCallStatus, updateLiveCallStatusLoading } = useUpdateLiveCallStatus({
		callId,
	});

	const {
		hangUpCall = () => { },
		hangUpLoading,
	} = useHangUpCall({
		callRecordId,
		firestore,
		loggedInAgentId,
		openFeedbackform,
	});

	useEffect(() => {
		const formattedData = formatData({ callDetails, loggedInAgentId });

		if (isEmpty(formattedData)) {
			checkHangupStatus({ setCallState, openFeedbackform, timeoutId: countdownRef.current, unmountVoiceCall });
			return;
		}

		setCallState((p) => ({
			...p,
			...formattedData,
			showCallModalType: CALL_MODALS.includes(p.showCallModalType) ? p.showCallModalType : 'fullCallModal',
		}));
	}, [callDetails, loggedInAgentId, openFeedbackform, unmountVoiceCall]);

	useEffect(() => {
		if (isInVoiceCall) {
			makeCallApi();
		}
	}, [isInVoiceCall, makeCallApi]);

	useEffect(() => {
		if (status === 'in_progress') {
			countdownRef.current = setInterval(() => {
				const secsDiff = (new Date() - new Date(callStartAt)) / SECS_TO_MS || DEFAULT_SECS;
				const roundOffSecs = secsDiff?.toFixed(DECIMAL_PLACES) || DEFAULT_SECS;

				setCallSecs(roundOffSecs);
			}, SECS_TO_MS);
		}

		const timeoutId = countdownRef.current;

		return () => {
			clearInterval(timeoutId);
		};
	}, [callStartAt, status]);

	const showLogModal = callData?.source === 'outstanding';

	return (
		<>
			{showCallModalType === 'fullCallModal' && (
				<CallModal
					receiverUserDetails={receiverUserDetails}
					status={status}
					callLoading={callLoading}
					updateLiveCallStatusLoading={updateLiveCallStatusLoading}
					updateLiveCallStatus={updateLiveCallStatus}
					setCallState={setCallState}
					counter={callSecs}
					hangUpCall={hangUpCall}
					hangUpLoading={hangUpLoading}
					attendees={attendees}
					conferenceType={conferenceType}
					callState={callState}
				/>
			)}
			{showCallModalType === 'feedbackModal' && !showLogModal && (
				<FeedbackModal
					receiverUserDetails={receiverUserDetails}
					unmountVoiceCall={unmountVoiceCall}
					loggedInAgentId={loggedInAgentId}
					callStartAt={callStartAt}
					callEndAt={callEndAt}
				/>
			)}

			{showCallModalType === 'feedbackModal' && showLogModal && (
				<LogModal
					showLog
					organizationId={callData?.orgData?.selfOrganizationId}
					unmountVoiceCall={unmountVoiceCall}
				/>
			)}

			{showCallModalType === 'minimizedModal' && (
				<MinimizeCallModal
					receiverUserDetails={receiverUserDetails}
					status={status}
					callLoading={callLoading}
					counter={callSecs}
					hangUpCall={hangUpCall}
					hangUpLoading={hangUpLoading}
					setCallState={setCallState}
				/>
			)}
		</>
	);
}
export default VoiceCall;
