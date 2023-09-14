import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const DEFAULT_PAGE = 1;

const useGetForecastFclFreightClusters = ({ filters = {} }) => {
	const { profile } = useSelector((state) => state);

	const { authParams = '', selected_agent_id = '' } = profile;

	const [page, setPage] = useState(DEFAULT_PAGE);

	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/get_rolling_forecast_fcl_freight_clusters',
		method : 'GET',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							...filters,
							supply_agent_id: selected_agent_id || undefined,
						},
						sort_by_cluster: true,
						page,
					},
				});
			} catch (error) {
				if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
			}
		},
		[page, trigger, filters, selected_agent_id],
	);

	useEffect(() => {
		fetch();
	}, [fetch, page, authParams, selected_agent_id]);

	const { list = [], ...pageData } = data || {};

	return {
		loading,
		page,
		setPage,
		list,
		pageData,
	};
};

export default useGetForecastFclFreightClusters;
