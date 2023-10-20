import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef, useState } from 'react';

import CallModal from './CallModal';
import FeedbackModal from './FeedBackModal';
import formatData from './helpers/formatData';
import { checkHangupStatus } from './helpers/hangupHelpers';
import useCloseVoiceCall from './hooks/useCloseVoiceCall';
import useFetchFirebaseRoom from './hooks/useFetchFirebase';
import useGetUserCallDetails from './hooks/useGetUserCallDetails';
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
		selfOrganizationId = '',
		source = '',
	} = callState || {};
	const { mobile_number = '', mobile_country_code = '' } = receiverUserDetails || {};

	const {
		loading = false,
		data = {},
	} = useGetUserCallDetails({
		mobileNumber      : mobile_number,
		mobileCountryCode : mobile_country_code,
	});

	const { agent_type = '' } = data || {};

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
		hangUpCall = () => {},
		hangUpLoading,
	} = useHangUpCall({
		callRecordId,
		firestore,
		loggedInAgentId,
	});

	useEffect(() => {
		const { feedback_form_status = '', ...rest } = callDetails || {};
		const formattedData = formatData({ callDetails: rest, loggedInAgentId });

		if (isEmpty(formattedData)) {
			checkHangupStatus({
				setCallState,
				openFeedbackform,
				timeoutId          : countdownRef.current,
				unmountVoiceCall,
				feedbackFormStatus : feedback_form_status,
			});
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

	const showLogModal = source === 'outstanding';

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
					callUserDetails={data}
					callUserLoading={loading}
				/>
			)}
			{showCallModalType === 'feedbackModal' && !showLogModal && (
				<FeedbackModal
					receiverUserDetails={receiverUserDetails}
					unmountVoiceCall={unmountVoiceCall}
					loggedInAgentId={loggedInAgentId}
					callStartAt={callStartAt}
					callEndAt={callEndAt}
					callRecordId={callRecordId}
					agentType={agent_type}
					firestore={firestore}
				/>
			)}

			{showCallModalType === 'feedbackModal' && showLogModal && (
				<LogModal
					showLog
					organizationId={selfOrganizationId}
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
