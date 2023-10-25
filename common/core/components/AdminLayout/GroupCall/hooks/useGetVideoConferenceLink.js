import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { getCookie } from '@cogoport/utils';
import { useCallback } from 'react';

const getParams = ({ meetingId = '', id = '', name = '' }) => ({
	meeting_id : meetingId,
	user_id    : id,
	user_name  : name,
});

const useGetVideoConferenceLink = () => {
	const { id = '', name = '' } = useSelector((state) => state?.profile?.user);

	const [, trigger] = useRequest({
		url    : '/get_video_conference_link',
		method : 'get',

	}, { manual: true, autoCancel: false });

	const getMeetingLink = useCallback(async ({ meetingId = '' }) => {
		try {
			const res = await trigger({
				params: getParams({ meetingId, id, name }),
			});

			const token = getCookie(process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME);
			window.open(`${res?.data?.join}&auth=${token}`, '_blank');
		} catch (error) {
			console.error('conference_call_error::', error);
		}
	}, [trigger, id, name]);

	return {
		getMeetingLink,
	};
};

export default useGetVideoConferenceLink;
