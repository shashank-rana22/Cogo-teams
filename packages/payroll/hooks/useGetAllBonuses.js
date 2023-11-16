import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetAllBonuses = () => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const { query = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_all_bonuses',
	}, { manual: true });

	const getBonuses = useCallback(
		async () => {
			try {
				const { page_limit, page, payment_status, ...rest } = filters;
				await trigger({
					params: {
						filters: {
							...rest,
							q              : query,
							payment_status : payment_status === 'all' ? undefined : payment_status,
						},
						page_limit,
						page,
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[filters, query, trigger],
	);

	useEffect(() => {
		getBonuses();
	}, [getBonuses]);

	return { loading, data, filters, setFilters, debounceQuery, refetch: getBonuses };
};

export default useGetAllBonuses;
