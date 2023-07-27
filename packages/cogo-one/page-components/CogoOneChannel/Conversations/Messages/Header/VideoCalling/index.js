import { IcMCallmonitor } from '@cogoport/icons-react';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback } from 'react';

import useCreateVideoCallTimeline from '../../../../../../hooks/useCreateVideoCallTimeline';

import styles from './styles.module.css';

function VideoCalling({ formattedData = {} }) {
	const { inVideoCall } = useSelector(({ profile }) => ({ inVideoCall: profile?.is_in_video_call || false }));
	const dispatch = useDispatch();

	const { createVideoCallTimeline, videoCallId } = useCreateVideoCallTimeline();
	const {
		user_id,
		lead_user_id,
		user_name,
	} = formattedData || {};

	const mountVideoCall = useCallback(() => {
		if (!inVideoCall) {
			dispatch(
				setProfileState({
					video_call_recipient_data: {
						user_id,
						user_name,
					},
					is_in_video_call : true,
					video_call_id    : videoCallId,
				}),
			);
		}

		createVideoCallTimeline({ userCallId: user_id, leadUserId: lead_user_id });
		// createVideoCallTimeline({data: {}});
	}, [createVideoCallTimeline, dispatch, inVideoCall, lead_user_id, user_id, user_name, videoCallId]);

	return (
		<div role="presentation" className={styles.video_call_btn} onClick={mountVideoCall}>
			<IcMCallmonitor />
		</div>
	);
}

export default VideoCalling;
