import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const DEFAULT_PAGE_COUNT = 1;

const useRecordedSessions = ({ showRecordedSession = false }) => {
	const [modalView, setModalView] = useState('list_view');
	const [page, setPage] = useState(DEFAULT_PAGE_COUNT);
	const [input, setInput] = useState({
		video_name : '',
		video_link : '',
	});

	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_course_videos',
	}, { manual: true });

	const [{ deleteLoading = false }, deleteApiTrigger] = useRequest({
		url    : '/delete_course_video',
		method : 'POST',
	}, { manual: true });

	const [{ createLoading = false }, createApiTrigger] = useRequest({
		url    : '/create_course_video',
		method : 'POST',
	}, { manual: true });

	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {},
					page,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [page, trigger]);

	useEffect(() => {
		if (showRecordedSession) fetch();
	}, [fetch, showRecordedSession, page]);

	const { list, ...paginationData } = data || {};

	const onClickDelete = async (id) => {
		try {
			await deleteApiTrigger({ data: { video_id: id } });

			Toast.success('Recorded session deleted');
			fetch();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	const onClickCreate = async () => {
		try {
			await createApiTrigger({
				data: {
					video_name : input?.video_name || undefined,
					video_link : input?.video_link || undefined,
				},
			});

			setModalView('list_view');
			setInput({ video_name: '', video_link: '' });
			fetch();
			Toast.success('New recorded session created');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return {
		list,
		page,
		setPage,
		loading,
		modalView,
		setModalView,
		paginationData,
		onClickDelete,
		deleteLoading,
		input,
		setInput,
		onClickCreate,
		createLoading,
	};
};

export default useRecordedSessions;
