import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall, IcMMinus } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState, useRef, useEffect } from 'react';

import styles from './styles.module.css';

function CallComing({
	rejectOfCall = () => {},
	answerOfCall = () => {},
	callDetails = {},
}) {
	const audioRef = useRef(null);
	const [isMaximize, setIsMaximize] = useState(true);

	const { my_details } = callDetails?.calling_details || {};

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
						<IcMMinus className={styles.minimize_icon} />
					</div>
					<Image
						src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
						alt="avatar-placeholder"
						height={90}
						width={90}
						className={styles.user_avatar}
					/>
					<div className={styles.comming_call_text}>
						Incoming call from
						<div className={styles.agent_name}>{my_details?.user_name || 'UnKnown'}</div>
					</div>
					<div className={styles.comming_call_options}>
						<IcMCall
							onClick={answerOfCall}
							className={cl`${styles.call_icon} ${styles.accept_call}`}
						/>
						<IcMCall
							onClick={rejectOfCall}
							className={cl`${styles.call_icon} ${styles.reject_call}`}
						/>
					</div>
				</div>
			) : (
				<div className={styles.call_comming_body}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
						alt="avatar-placeholder"
						height={50}
						width={50}
						className={styles.user_avatar}
					/>
					<div
						role="presentation"
						className={styles.call_comming_text}
						onClick={() => setIsMaximize(true)}
					>
						{my_details?.user_name || 'UnKnown'}
					</div>
					<div className={styles.call_comming_btn}>
						<IcMCall
							onClick={rejectOfCall}
							className={cl`${styles.minimize_call_icon} ${styles.minimize_reject_icon}`}
						/>
						<IcMCall
							onClick={answerOfCall}
							className={cl`${styles.minimize_call_icon} ${styles.minmize_accept_icon}`}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default CallComing;
