import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const PAGE_LIMIT = 4;

const useTestsList = () => {
	const {
		user: { id: user_id },
	} = useSelector(({ profile }) => ({
		user: profile.user,
	}));

	const [testCategory, setTestCategory] = useState('all');
	const [page, setPage] = useState(1);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_tests',
	}, { manual: true });

	const { total_count } = data || {};

	useEffect(() => {
		try {
			trigger({
				params: {
					page_limit : PAGE_LIMIT,
					page,
					filters    : {
						q              : searchQuery,
						user_id,
						current_status : testCategory === 'all' ? undefined : testCategory,
						status         : ['active', 'draft', 'published'],
					},
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.message?.data));
		}
	}, [searchQuery, trigger, user_id, testCategory, page]);

	useEffect(() => {
		setPage(1);
	}, [testCategory]);

	return {
		loading,
		debounceQuery,
		testCategory,
		setTestCategory,
		page,
		setPage,
		total_count,
		data,
		PAGE_LIMIT,
	};
};

export default useTestsList;
