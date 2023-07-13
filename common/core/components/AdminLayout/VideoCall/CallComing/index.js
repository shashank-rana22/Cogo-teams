import { IcMCall, IcMVideoCall } from '@cogoport/icons-react';

import styles from './styles.module.css';

function CallComing({
	rejectOfCall = () => {}, answerOfCall = () => {},
}) {
	return (
		<div className={styles.call_comming_body}>
			<div>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp"
					alt="avatar-placeholder"
				/>
			</div>
			<div className={styles.call_comming_text}>
				call Coming ..
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

export default CallComing;
