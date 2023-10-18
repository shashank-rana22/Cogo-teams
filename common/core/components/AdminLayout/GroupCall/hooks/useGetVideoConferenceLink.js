import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getParams = ({ meeting_id = '', id = '', name = '' }) => ({
	meeting_id,
	user_id   : id,
	user_name : name,
});

const useGetVideoConferenceLink = ({ meeting_id, showModalType }) => {
	const { id = '', name = '' } = useSelector((state) => state?.profile?.user);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_video_conference_link',
		method : 'get',

	}, { manual: true });

	const getLink = useCallback(() => {
		try {
			trigger({
				params: getParams({ meeting_id, id, name }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [trigger, meeting_id, id, name]);

	useEffect(() => {
		if (meeting_id && showModalType === 'ongoing') {
			getLink();
		}
	}, [getLink, meeting_id, showModalType]);

	return {
		loading,
		data,
		meeting_link: data?.join,
	};
};

export default useGetVideoConferenceLink;
