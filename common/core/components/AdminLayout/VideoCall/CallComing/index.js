import { IcMCall, IcMMinus, IcMVideoCall } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function CallComing({
	rejectOfCall = () => {}, answerOfCall = () => {},
}) {
	const [isMaximize, setIsMaximize] = useState(true);

	return (
		<div className={styles.call_comming}>
			{isMaximize ? (
				<div className={styles.big_call_comming}>
					<div
						role="presentation"
						className={styles.minimize_btn}
						onClick={() => setIsMaximize(false)}
					>
						<IcMMinus />
					</div>
					<div className={styles.avator}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp"
							alt="avatar-placeholder"
						/>
					</div>
					<div className={styles.comming_call_text}>
						incoming Call from
						<div className={styles.agent_name}>Agent Name</div>
					</div>
					<div className={styles.comming_call_options}>
						<div role="presentation" onClick={answerOfCall} className={styles.accept}>
							<IcMCall />
						</div>
						<div role="presentation" onClick={rejectOfCall} className={styles.reject}>
							<IcMCall />
						</div>
					</div>

				</div>
			) : (
				<div className={styles.call_comming_body}>
					<div>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp"
							alt="avatar-placeholder"
						/>
					</div>
					<div
						role="presentation"
						className={styles.call_comming_text}
						onClick={() => setIsMaximize(true)}
					>
						Agent Name
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
			)}

		</div>

	);
}

export default CallComing;
