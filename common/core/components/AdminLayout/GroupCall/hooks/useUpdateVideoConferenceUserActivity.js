import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useState } from 'react';

import useGetVideoConferenceLink from './useGetVideoConferenceLink';

const getParams = ({
	meetingId = '',
	agentId = '',
	callStatus = '',
}) => ({
	meeting_id  : meetingId,
	user_id     : agentId,
	call_status : callStatus,
});

function useUpdateVideoConferenceUserActivity({
	meetingId = '',
}) {
	const agentId = useSelector(({ profile }) => profile?.user?.id);

	const [loading, setLoading] = useState(false);

	const [, trigger] = useRequest({
		url    : '/update_video_conference_user_activity',
		method : 'post',

	}, { manual: true });

	const { getMeetingLink = () => {} } = useGetVideoConferenceLink();

	const updateUserActivity = useCallback(async ({ callStatus = '' }) => {
		try {
			setLoading(true);
			await trigger({
				params: getParams({ meetingId, agentId, callStatus }),
			});

			if (callStatus === 'ongoing') {
				getMeetingLink({ meetingId });
			}
		} catch (error) {
			console.error('error', error);
		} finally {
			setLoading(false);
		}
	}, [trigger, agentId, meetingId, getMeetingLink]);

	return {
		loading,
		updateUserActivity,
	};
}

export default useUpdateVideoConferenceUserActivity;
