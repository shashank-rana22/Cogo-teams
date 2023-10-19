import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetListProductDetail = () => {
	const [filters, setFilters] = useState({
		page_limit : 6,
		page       : 1,
	});
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_products',
	}, { manual: true });

	const getListProductDetail = useCallback(
		async () => {
			try {
				const { page, page_limit, category_id, ...rest } = filters;
				console.log(rest, '::rest');
				await trigger({
					params: {
						filters: {
							category_id: category_id || null,
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
		[trigger, filters],
	);

	useEffect(() => {
		getListProductDetail();
	}, [getListProductDetail]);

	return { loading, data, getListProductDetail, filters, setFilters };
};

export default useGetListProductDetail;
