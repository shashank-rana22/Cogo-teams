import { IcMCallmonitor } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import useCreateVideoCallTimeline from '../../../../../../hooks/useCreateVideoCallTimeline';

import styles from './styles.module.css';

function VideoCalling({ formattedData = {} }) {
	const { inVideoCall, video_call_id } = useSelector(({ profile }) => ({
		inVideoCall   : profile?.is_in_video_call || false,
		video_call_id : profile?.video_call_id,
	}));
	console.log('video_call_id:', video_call_id);

	const { createVideoCallTimeline } = useCreateVideoCallTimeline({ formattedData });
	const {
		user_id,
		lead_user_id,
	} = formattedData || {};

	const mountVideoCall = useCallback(async () => {
		if (!inVideoCall) {
			await createVideoCallTimeline({ userCallId: user_id, leadUserId: lead_user_id });
		}
	}, [createVideoCallTimeline, inVideoCall, lead_user_id, user_id]);

	return (
		<div role="presentation" className={styles.video_call_btn} onClick={mountVideoCall}>
			<IcMCallmonitor />
		</div>
	);
}

export default VideoCalling;
