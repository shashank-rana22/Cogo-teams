import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const DEFAULT_PAGE = 1;

const useGetRollingFclFreightSuppliers = ({ filters = {}, origin_location_id = '', destination_location_id = '' }) => {
	const [page, setPage] = useState(DEFAULT_PAGE);

	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/get_rolling_fcl_freight_suppliers',
		method : 'GET',
	}, { manual: true });

	const fetchRollingForecastPortPairs = useCallback(async () => {
		try {
			await trigger({
				params: {
					origin_location_id,
					destination_location_id,
					filters,
					page,
				},
			});
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trigger, page, origin_location_id, destination_location_id]);

	useEffect(() => {
		fetchRollingForecastPortPairs();
	}, [fetchRollingForecastPortPairs, page]);

	const { list = [], ...pageData } = data || {};

	return {
		loading,
		list,
		page,
		setPage,
		pageData,
	};
};

export default useGetRollingFclFreightSuppliers;
