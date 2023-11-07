import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetOrderHistory = () => {
	const [filtersHistory, setFiltersHistory] = useState({
		page_limit : 3,
		page       : 1,
	});
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_order_history',
	}, { manual: true });

	const getOrderHistory = useCallback(
		async () => {
			try {
				const { page, page_limit, ...rest } = filtersHistory;
				const params = {
					page,
					page_limit,
					filters: {
						...rest,
					},
				};
				await trigger({ params });
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[trigger, filtersHistory],
	);

	useEffect(() => {
		getOrderHistory();
	}, [getOrderHistory, filtersHistory]);

	return { loading, data, getOrderHistory, filtersHistory, setFiltersHistory };
};

export default useGetOrderHistory;
