import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const DEFAULT_PAGE = 1;

function useListCourseVideos() {
	const [page, setPage] = useState(DEFAULT_PAGE);

	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_course_videos',
		method : 'GET',
	}, { manual: false });

	const fetchList = useCallback(async () => {
		try {
			await trigger({ params: { page } });
		} catch (error) {
			Toast.error(error.message);
		}
	}, [page, trigger]);

	useEffect(() => {
		fetchList();
	}, [fetchList, page]);

	const { list, ...paginationData } = data || {};

	return {
		data,
		loading,
		fetchList,
		page,
		setPage,
		paginationData,
	};
}

export default useListCourseVideos;
