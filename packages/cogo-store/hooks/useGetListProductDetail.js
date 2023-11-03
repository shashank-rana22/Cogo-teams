import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetListProductDetail = () => {
	const [filters, setFilters] = useState({
		page_limit : 30,
		page       : 1,
	});

	const geo = getGeoConstants();
	const { country } = geo || {};
	const { code } = country || {};

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_products',
	}, { manual: true });

	const getListProductDetail = useCallback(
		async () => {
			try {
				const { page, page_limit, category_id } = filters;
				await trigger({
					params: {
						filters: {
							category_id: category_id || null,
						},
						page_limit,
						page,
						currency_code: code,
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[code, filters, trigger],
	);

	useEffect(() => {
		getListProductDetail();
	}, [getListProductDetail]);

	return { loading, data, getListProductDetail, filters, setFilters };
};

export default useGetListProductDetail;
