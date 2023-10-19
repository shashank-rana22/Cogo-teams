import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const getParams = ({ meetingId = '', id = '', name = '' }) => ({
	meeting_id : meetingId,
	user_id    : id,
	user_name  : name,
});

const useGetVideoConferenceLink = ({ meetingId = '' }) => {
	const { id = '', name = '' } = useSelector((state) => state?.profile?.user);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_video_conference_link',
		method : 'get',

	}, { manual: true });

	const getLink = useCallback(() => {
		try {
			trigger({
				params: getParams({ meetingId, id, name }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [trigger, meetingId, id, name]);

	return {
		loading,
		data,
		meeting_link: data?.join,
		getLink,
	};
};

export default useGetVideoConferenceLink;
