import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import CallModal from './CallModal';
import FeedbackModal from './FeedBackModal';
import useHangUpCall from './hooks/useHangUpCall';
import useOutgoingCall from './hooks/useOutgoingCall';
import useOutgoingStatusCall from './hooks/useOutgoingStatusCall';
import MinimizeCallModal from './MinimizeModal';

function VoiceCall() {
	const dispatch = useDispatch();
	const [counter, setCounter] = useState(0);
	const profileData = useSelector(({ profile }) => profile);
	const voiceCall = profileData?.voice_call;
	const {
		inCall,
		endCall,
		showCallModal,
		orgId,
		userId,
		name,
		mobile_number,
		mobile_country_code,
		minimizeModal = false,
		showFeedbackModal = false,
	} = voiceCall || {};

	const {
		makeCallApi = () => {},
		callLoading,
		callId,
		callStatus,
		setCallId = () => {},
	} = useOutgoingCall();

	const {
		callStatusApi = () => {},
		status,
		setStatus = () => {},
	} = useOutgoingStatusCall({
		callId,
	});

	const { hangUpCall = () => {}, hangUpLoading } = useHangUpCall({
		callId,
		setCallId,
		setStatus,
	});

	const handleEnd = async () => {
		if (!callLoading && inCall && !hangUpLoading) {
			setStatus('hanging up');
			dispatch(
				setProfileState({
					...profileData,
					voice_call: {
						...profileData?.voice_call,
						endCall           : true,
						showCallModal     : false,
						minimizeModal     : false,
						inCall            : false,
						endTime           : new Date(),
						showFeedbackModal : true,
					},
				}),
			);
		}
	};

	useEffect(() => {
		if (inCall) {
			makeCallApi();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inCall]);

	useEffect(() => {
		let interval = '';
		if (callStatus === 200
			&& !callLoading
			&& callId !== '') {
			interval = setInterval(() => {
				callStatusApi();
			}, 5000);
		}
		return () => clearInterval(interval);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callStatus, callLoading, callId]);

	useEffect(() => {
		if (endCall) {
			hangUpCall();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [endCall]);

	const durationTime = () => {
		let time = '';
		if (!callLoading) {
			const secs = counter % 60;
			const minute = Math.trunc(counter / 60) % 60;
			const hour = Math.trunc(Math.trunc(counter / 60) / 60) % 60;

			if (hour > 0) {
				time = `${hour} hour ${minute} min ${secs} sec`;
			} else if (minute > 0) {
				time = `${minute} min ${secs} sec`;
			} else if (secs > 0) {
				time = `${secs} sec`;
			}
		}
		return time;
	};

	useEffect(() => {
		let startcounter;
		if (!callLoading) {
			if (callId) {
				startcounter = setInterval(() => {
					setCounter((prevCounter) => prevCounter + 1);
				}, 1000);
			}
		}
		return () => {
			clearInterval(startcounter);
			setCounter(0);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callId, callLoading]);

	return (
		<>
			{showCallModal && (
				<CallModal
					dispatch={dispatch}
					name={name}
					mobile_number={mobile_number}
					mobile_country_code={mobile_country_code}
					profileData={profileData}
					showCallModal={showCallModal}
					status={status}
					handleEnd={handleEnd}
					durationTime={durationTime}
					callLoading={callLoading}
				/>
			)}
			{!isEmpty(orgId) && !isEmpty(userId) && showFeedbackModal && (
				<FeedbackModal
					dispatch={dispatch}
					profileData={profileData}
				/>
			)}
			{minimizeModal && (
				<MinimizeCallModal
					dispatch={dispatch}
					name={name}
					mobile_number={mobile_number}
					mobile_country_code={mobile_country_code}
					profileData={profileData}
					minimizeModal={minimizeModal}
					status={status}
					handleEnd={handleEnd}
					durationTime={durationTime}
					callLoading={callLoading}
				/>
			)}
		</>

	);
}
export default VoiceCall;
