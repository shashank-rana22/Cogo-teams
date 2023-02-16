import { Modal, cl } from '@cogoport/components';
import { IcMCall, IcMProfile } from '@cogoport/icons-react';
// import { setStoreState as setProfileStoreState } from '@cogoport/request';
// import { useDispatch, useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import useHangUpCall from '../../../../hooks/useHangUpCall';
import useOutgoingCall from '../../../../hooks/useOutgoingCall';
import useOutgoingStatusCall from '../../../../hooks/useOutgoingStatusCall';

import styles from './styles.module.css';

function VoiceCallComponent({
	mobile_number_eformat,
}) {
	const [showCallModal, setShowCallModal] = useState(false);
	const [counter, setCounter] = useState(0);

	const {
		makeCallApi = () => {},
		callLoading,
		callId,
		callStatus,
		setCallId = () => {},
		setCallStatus = () => {},
	} = useOutgoingCall({ setShowCallModal });

	const {
		callStatusApi = () => {},
		status,
		setStatus = () => {},
	} = useOutgoingStatusCall({ callId });

	const { hangUpCall = () => {}, hangUpLoading } = useHangUpCall({
		callId,
		setCallId,
		setStatus,
		setShowCallModal,
	});

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
	if (status === 'complete') {
		hangUpCall();
	}

	const handleCall = async () => {
		setShowCallModal(true);
		await makeCallApi();
	};

	const handleEnd = async () => {
		await hangUpCall();
		setCallId('');
		setCallStatus('');
		setCounter(0);
		setShowCallModal(false);
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.number_div}>
					<IcMCall className={styles.call_icon} onClick={handleCall} />
					<div className={styles.show_number}>
						{mobile_number_eformat?.slice(0, 2)}
						{' '}
						{mobile_number_eformat?.slice(2)}
					</div>
				</div>
			</div>
			{showCallModal && (
				<Modal
					size="sm"
					show={showCallModal}
					// onClose={() => setShowCallModal(false)}
					placement="top"
					showCloseIcon={false}
				>
					<Modal.Body>
						<div className={styles.content}>
							<div className={styles.avatar}>
								<IcMProfile width={40} height={40} />
							</div>
							<div className={styles.org_name}>
								Shri Hari Shipping Service
							</div>
							<div className={styles.number}>
								+91 987654345678
							</div>
							<div className={styles.status_div}>{status || 'Connecting...'}</div>
							<div className={styles.timer}>{durationTime()}</div>
							<div className={cl`${styles.hang_up} ${hangUpLoading ? styles.disable : ''}`}>
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
		</div>

	);
}
export default VoiceCallComponent;
