import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useState, useEffect } from 'react';

const DEFAULT_PAGE = 1;

const useGetRollingFclFreightSuppliers = ({
	origin_location_id = '',
	destination_location_id = '',
	isMiniCluster = false,
}) => {
	const { profile } = useSelector((state) => state);
	const { authParams = '', selected_agent_id = '' } = profile;
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
					filters                     : {
						stakeholder_id: selected_agent_id || undefined,
					},
				},
			});
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	}, [trigger, origin_location_id, destination_location_id, isMiniCluster, page, selected_agent_id]);

	useEffect(() => {
		fetchRollingForecastPortPairs();
	}, [fetchRollingForecastPortPairs, page, authParams]);

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
