import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall, IcMMinus, IcMVideoCall } from '@cogoport/icons-react';
import { useState, useRef, useEffect } from 'react';

import styles from './styles.module.css';

function CallComing({
	rejectOfCall = () => {}, answerOfCall = () => {},
	callDetails = {},
}) {
	const { my_details } = callDetails?.calling_details || {};
	const [isMaximize, setIsMaximize] = useState(true);
	const audioRef = useRef(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	}, []);

	return (
		<div className={styles.call_comming}>
			<audio
				ref={audioRef}
				src={GLOBAL_CONSTANTS.video_call_ring_tone_url}
			/>
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
							src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
							alt="avatar-placeholder"
						/>
					</div>
					<div className={styles.comming_call_text}>
						Incoming Call from
						<div className={styles.agent_name}>{my_details?.name || 'UnKnown'}</div>
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
							src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
							alt="avatar-placeholder"
						/>
					</div>
					<div
						role="presentation"
						className={styles.call_comming_text}
						onClick={() => setIsMaximize(true)}
					>
						{my_details?.name || 'UnKnown'}
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
