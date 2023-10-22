import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListAllFeed = () => {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_all_feed',
	}, { manual: true });

	const listAllFeed = useCallback(
		() => {
			try {
				trigger({
					params: {
						page       : filters.page,
						page_limit : 5,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger, filters],
	);

	useEffect(() => {
		listAllFeed();
	}, [listAllFeed]);

	return {
		loading,
		data,
		refetch: listAllFeed,
		setFilters,
	};
};

export default useListAllFeed;
