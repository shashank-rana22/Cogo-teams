import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function CallComming({ setInACall = () => {}, setCallComming = () => {}, setStreams = () => {}, localStream = null }) {
	const answerOfCall = () => {
		setInACall(true);
		setCallComming(false);
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true }).then((userStream) => {
				const tempLocalStream = localStream;
				setStreams((prev) => ({ ...prev, user_stream: userStream }));
				tempLocalStream.current = userStream;
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
					style={{ width: '10px' }}
					src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp"
					alt="avatar-placeholder"
				/>
			</div>
			<div className={styles.call_comming_text}>
				call Comming ..
			</div>
			<div className={styles.call_comming_btn}>
				<Button size="md" themeType="accent" onClick={answerOfCall}>Answer</Button>
				<Button onClick={rejectOfCall}>Reject</Button>
			</div>
		</div>
	);
}

export default CallComming;
