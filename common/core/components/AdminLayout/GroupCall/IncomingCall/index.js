import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall, IcMMinus } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState, useRef, useEffect } from 'react';

import useUpdateVideoConferenceUserActivity from '../hooks/useUpdateVideoConferenceUserActivity';

import styles from './styles.module.css';

function IncomingCall({
	videoCallDetails = {},
	setShowDeleteModal = () => {},
}) {
	const audioRef = useRef(null);
	const [isMaximize, setIsMaximize] = useState(true);

	const { team_name, meeting_id } = videoCallDetails || {};

	const { updateUserActivity } = useUpdateVideoConferenceUserActivity({ meeting_id });

	useEffect(() => {
		const audioRefCopy = audioRef;

		if (audioRef.current) {
			audioRef.current?.play();
		}

		return () => {
			audioRefCopy?.current?.pause();
		};
	}, []);

	return (
		<div className={styles.call_coming}>
			<audio
				ref={audioRef}
				src={GLOBAL_CONSTANTS.video_call_ring_tone_url}
			/>

			{isMaximize ? (
				<div className={styles.big_call_coming}>
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
					<div className={styles.coming_call_text}>
						Incoming call from
						<div className={styles.agent_name}>{team_name || 'Unknown'}</div>
					</div>
					<div className={styles.coming_call_options}>
						<IcMCall
							onClick={() => { updateUserActivity('ongoing'); setShowDeleteModal(true); }}
							className={cl`${styles.call_icon} ${styles.accept_call}`}
						/>
						<IcMCall
							onClick={() => { updateUserActivity('rejected'); }}
							className={cl`${styles.call_icon} ${styles.reject_call}`}
						/>
					</div>
				</div>
			) : (
				<div className={styles.call_coming_body}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
						alt="avatar-placeholder"
						height={50}
						width={50}
						className={styles.user_avatar}
					/>
					<div
						role="presentation"
						className={styles.call_coming_text}
						onClick={() => setIsMaximize(true)}
					>
						{team_name || 'Unknown'}
					</div>
					<div className={styles.call_coming_btn}>
						<IcMCall
							onClick={() => { updateUserActivity('ongoing'); setShowDeleteModal(true); }}
							className={cl`${styles.minimize_call_icon} ${styles.minimize_reject_icon}`}
						/>
						<IcMCall
							onClick={() => { updateUserActivity('rejected'); }}
							className={cl`${styles.minimize_call_icon} ${styles.minmize_accept_icon}`}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default IncomingCall;
