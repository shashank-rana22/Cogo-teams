import { IcMCall } from '@cogoport/icons-react';
// import { setStoreState as setProfileStoreState } from '@cogoport/request';
// import { useDispatch, useSelector } from '@cogoport/store';
// import { useState } from 'react';

// import useHangUpCall from '../../../../hooks/useHangUpCall';
// import useOutgoingCall from '../../../../hooks/useOutgoingCall';
// import useOutgoingStatusCall from '../../../../hooks/useOutgoingStatusCall';

import styles from './styles.module.css';

function VoiceCallComponent({
	mobile_number_eformat,
	// setSwapUi = () => {},
	// swapUi,
	// status,
	// callLoading,
}) {
	// const [counter, setCounter] = useState(0);
	// const dispatch = useDispatch();
	// const { profileData } = useSelector(({ profile }) => ({
	// 	profileData: profile,
	// }));

	// const handleClick = () => {
	// 	dispatch(
	// 		setProfileStoreState({
	// 			...profileData,
	// 			voice_call: {
	// 				// name: item?.name,
	// 				// organization_name: item?.organization?.business_name,
	// 				// userId: item?.user_id,
	// 				// orgId: item?.organization_id,
	// 				showCall      : true,
	// 				destTrue      : false,
	// 				// showActiveCallModal : true,
	// 				// showFeedbackModal: false,
	// 				minimizeModal : false,
	// 				callUser      : true,
	// 				inCall        : false,
	// 				endCall       : false,
	// 				// type,
	// 			},
	// 		}),
	// 	);
	// };
	// const {
	// 	makeCallApi = () => {},
	// 	callLoading, callId, callReceived,
	// 	setCallId = () => {},
	// 	inCall,
	// 	setInCall = () => {},
	// } = useOutgoingCall({ setSwapUi });
	// console.log('callStatus', callReceived);
	// const { callStatusApi = () => {}, status, setStatus = () => {} } = useOutgoingStatusCall({ callId });
	// console.log('status', status);

	// const { hangUpCall = () => {} } = useHangUpCall({ callId, setCallId, setStatus, setInCall });

	// const durationTime = () => {
	// 	let time = '';
	// 	if (!callLoading) {
	// 		const secs = counter % 60;
	// 		const minute = Math.trunc(counter / 60) % 60;
	// 		const hour = Math.trunc(Math.trunc(counter / 60) / 60) % 60;

	// 		if (hour > 0) {
	// 			time = `${hour} hour ${minute} min ${secs} sec`;
	// 		} else if (minute > 0) {
	// 			time = `${minute} min ${secs} sec`;
	// 		} else if (secs > 0) {
	// 			time = `${secs} sec`;
	// 		}
	// 	}
	// 	return time;
	// };

	// useEffect(() => {
	// 	let interval = '';
	// 	if (callReceived === 200
	// 		&& !callLoading
	// 		&& callId !== '') {
	// 		interval = setInterval(() => {
	// 			callStatusApi();
	// 		}, 5000);
	// 	}

	// 	return () => clearInterval(interval);
	// }, [callReceived, callLoading, callId]);

	// useEffect(() => {
	// 	let startcounter;
	// 	if (!callLoading) {
	// 		if (inCall) {
	// 			startcounter = setInterval(() => {
	// 				setCounter((prevCounter) => prevCounter + 1);
	// 			}, 1000);
	// 		}
	// 	}
	// 	return () => {
	// 		clearInterval(startcounter);
	// 		setCounter(0);
	// 	};
	// }, [inCall, callLoading]);

	// const handleClick = async () => {
	// 	setSwapUi(true);
	// 	await makeCallApi();
	// };

	// const handleEnd = async () => {
	// 	await hangUpCall();
	// 	setSwapUi(false);
	// };
	return (
		<div className={styles.container}>
			{/* {!swapUi && !callLoading ? ( */}
			<div className={styles.number_div}>
				<IcMCall className={styles.call_icon} />
				<div className={styles.number}>
					{mobile_number_eformat?.slice(0, 2)}
					{' '}
					{mobile_number_eformat?.slice(2)}
				</div>
			</div>
			{/* ) : (
				<div className={styles.status_div}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/hangUp.svg"
						alt="hang-Up"
						style={{ width: '30px', height: '30px' }}
						// onClick={handleEnd}
						role="presentation"
					/>
					<div className={styles.content}>
						<div className={styles.status}>
							{status || 'Connecting...'}
						</div>
						<div className={styles.duration}>
							{durationTime()}
						</div>
					</div>
				</div>
			)} */}

		</div>

	);
}
export default VoiceCallComponent;
