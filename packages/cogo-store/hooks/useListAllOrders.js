import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

const useListAllOrders = ({ dateArray = [] } = {}) => {
	const [filters, setFilters] = useState({
		page_limit : 10,
		page       : 1,
	});

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_all_orders',
	}, { manual: true });

	const getOrders = useCallback(
		async () => {
			if (isEmpty(dateArray)) {
				return;
			}
			try {
				const { page_limit, page, order_status, date_sort, ...rest } = filters;
				await trigger({
					params: {
						filters: {
							...rest,
							date_sort    : date_sort || dateArray?.[GLOBAL_CONSTANTS.zeroeth_index],
							order_status : order_status === 'All' ? undefined : order_status,
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
		[dateArray, filters, trigger],
	);

	useEffect(() => {
		getOrders();
	}, [getOrders]);

	return { loading, data, filters, setFilters, refetch: getOrders };
};

export default useListAllOrders;
