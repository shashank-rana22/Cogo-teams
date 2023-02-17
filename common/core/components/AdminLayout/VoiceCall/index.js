import { Modal } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import FeedbackModal from './FeedBackModal';
import useHangUpCall from './hooks/useHangUpCall';
import useOutgoingCall from './hooks/useOutgoingCall';
import useOutgoingStatusCall from './hooks/useOutgoingStatusCall';
import styles from './styles.module.css';

function VoiceCall() {
	const dispatch = useDispatch();
	const [counter, setCounter] = useState(0);
	const profileData = useSelector(({ profile }) => profile);
	const voiceCall = profileData?.voice_call;
	const {
		inCall,
		endCall,
		showCallModal,
		// showFeedbackModal,
		orgId,
		userId,
		name,
		mobile_number,
		// mobile_country_code,
	} = voiceCall || {};

	const code = mobile_number?.slice(0, 3);
	const number = mobile_number?.slice(3);

	const {
		makeCallApi = () => {},
		callLoading,
		callId,
		callStatus,
		setCallId = () => {},
	} = useOutgoingCall({ number });

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
		<div className={styles.wrapper}>
			{showCallModal && (
				<Modal show={showCallModal} size="sm">
					<Modal.Body>
						<div className={styles.content}>
							<div className={styles.avatar}>
								<IcMProfile width={40} height={40} />
							</div>
							<div className={styles.org_name}>
								{name || 'Unknown User'}
							</div>
							<div className={styles.number}>
								{code}
								{' '}
								{number}
							</div>
							<div className={styles.status_div}>{status || 'Connecting...'}</div>
							<div className={styles.timer}>{durationTime()}</div>
							<div className={styles.hang_up}>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/hangUp.svg"
									alt="hang-Up"
									style={{ width: '50px', height: '50px' }}
									role="presentation"
									onClick={handleEnd}
								/>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
			{!isEmpty(orgId) && !isEmpty(userId) && (
				<FeedbackModal />
			)}

		</div>

	);
}
export default VoiceCall;
