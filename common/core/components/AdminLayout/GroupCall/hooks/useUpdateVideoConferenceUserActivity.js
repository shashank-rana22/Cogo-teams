import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const getParams = ({ meeting_id = '', id = '', call_status = '' }) => ({
	meeting_id,
	user_id: id,
	call_status,
});
function useUpdateVideoConferenceUserActivity({ meeting_id }) {
	const { id = '' } = useSelector((state) => state?.profile?.user);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_video_conference_user_activity',
		method : 'post',

	}, { manual: true });

	const updateUserActivity = useCallback((call_status) => {
		try {
			trigger({
				params: getParams({ meeting_id, id, call_status }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [trigger, id, meeting_id]);

	return {
		loading,
		updateUserActivity,
	};
}

export default useUpdateVideoConferenceUserActivity;
