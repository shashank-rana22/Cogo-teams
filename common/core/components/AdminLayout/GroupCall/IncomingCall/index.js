import { cl, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useRef, useEffect } from 'react';

import useUpdateVideoConferenceUserActivity from '../hooks/useUpdateVideoConferenceUserActivity';

import styles from './styles.module.css';

function IncomingCall({
	videoCallDetails = {},
}) {
	const audioRef = useRef(null);

	const { team_name = '', meeting_id = '', created_by = '', is_group = false } = videoCallDetails || {};

	const {
		updateUserActivity = () => {},
		loading = false,
	} = useUpdateVideoConferenceUserActivity({ meetingId: meeting_id });

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current?.play();
		}

		const audioRefCopy = audioRef;

		return () => {
			audioRefCopy?.current?.pause();
		};
	}, []);

	return (
		<div className={styles.container}>
			<audio
				ref={audioRef}
				src={GLOBAL_CONSTANTS.incoming_call_ring_tone_loop}
				loop
			/>
			<div className={styles.header}>
				<p className={styles.user_name}>{startCase(created_by)}</p>
				<p>{!is_group ? 'is calling you' : 'is calling you from group'}</p>
				{is_group ? <p className={styles.group_name}>{startCase(team_name)}</p> : null}
			</div>
			<Avatar
				className={styles.styled_avatar}
				size="44px"
				personName={created_by}
			/>
			<div className={styles.footer}>
				<div
					role="presentation"
					className={cl`${styles.icon_wrapper} ${styles.accept_call}`}
					onClick={() => updateUserActivity({ callStatus: 'ongoing' })}
					style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
				>
					<IcMCall />
				</div>
				<div
					role="presentation"
					className={cl`${styles.icon_wrapper} ${styles.reject_call}`}
					onClick={() => updateUserActivity({ callStatus: 'reject' })}
					style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
				>
					<IcMCall />
				</div>
			</div>
		</div>
	);
}

export default IncomingCall;
