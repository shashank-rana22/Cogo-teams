import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useGetBranchStats = () => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({

		method : 'GET',
		url    : '/list_company_branches',
	}, { manual: false });

	const getBranchStats = useCallback(
		() => {
			const { page_limit, page } = filters;
			trigger({
				params: {
					filters: {
						q: query,
					},
					page_limit,
					page,
				},
			});
		},
		[filters, trigger, query],
	);

	useEffect(() => {
		try {
			getBranchStats();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	}, [getBranchStats]);

	return { loading, data, getBranchStats, debounceQuery, setFilters };
};

export default useGetBranchStats;
