import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetProductDetailsList = () => {
	const [filters, setFilters] = useState({
	});
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_products',
	}, { manual: true });

	const getProductDetailsList = useCallback(
		async () => {
			try {
				const { category_id } = filters;
				await trigger({
					params: {
						filters: {
							category_id: category_id || null,
						},
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[trigger, filters],
	);

	useEffect(() => {
		getProductDetailsList();
	}, [getProductDetailsList]);

	return { loading, data, getProductDetailsList, filters, setFilters };
};

export default useGetProductDetailsList;
