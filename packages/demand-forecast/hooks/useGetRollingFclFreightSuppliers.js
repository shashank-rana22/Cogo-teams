import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

const DEFAULT_PAGE = 1;

const useGetRollingFclFreightSuppliers = ({
	origin_location_id = '',
	destination_location_id = '',
	isMiniCluster = false,
}) => {
	const [page, setPage] = useState(DEFAULT_PAGE);

	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/get_rolling_forecast_fcl_freight_suppliers',
		method : 'GET',
	}, { manual: true });

	const fetchRollingForecastPortPairs = useCallback(async () => {
		try {
			await trigger({
				params: {
					origin_location_id          : origin_location_id || undefined,
					destination_location_id     : destination_location_id || undefined,
					mini_clusters_data_required : isMiniCluster,
					page,
				},
			});
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	}, [trigger, origin_location_id, destination_location_id, isMiniCluster, page]);

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