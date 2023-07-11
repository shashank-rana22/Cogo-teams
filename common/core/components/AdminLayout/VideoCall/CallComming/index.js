import { IcMCall, IcMVideoCall } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CallComming({ setInACall = () => {}, setCallComming = () => {}, setStreams = () => {} }) {
	const answerOfCall = () => {
		setInACall(true);
		setCallComming(false);
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true }).then((userStream) => {
				setStreams((prev) => ({ ...prev, user_stream: userStream }));
			}).catch((error) => {
				console.log('user stream is not working', error);
			});
	};

	const rejectOfCall = () => {
		setCallComming(false);
	};

	return (
		<div className={styles.call_comming_body}>
			<div>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp"
					alt="avatar-placeholder"
				/>
			</div>
			<div className={styles.call_comming_text}>
				call Comming ..
			</div>
			<div className={styles.call_comming_btn}>
				<div role="presentation" onClick={rejectOfCall} className={styles.reject}>
					<IcMCall />
				</div>
				<div role="presentation" onClick={answerOfCall} className={styles.accept}>
					<IcMVideoCall />
				</div>
			</div>
		</div>
	);
}

export default CallComming;
