import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

const useGetRollingForecastPortPairs = () => {
	const { profile } = useSelector((state) => state);

	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/get_rolling_forecast_port_pairs',
		method : 'GET',
	}, { manual: true });

	const { selected_agent_id = '' } = profile;

	const getRollingForecastPortPairs = useCallback(({
		origin_cluster_id = '',
		destination_cluster_id = '',
	}) => {
		try {
			trigger({
				params: {
					...(selected_agent_id ? {
						filters: {
							supply_agent_id: selected_agent_id || undefined,
						},
					} : {}),
					...(origin_cluster_id ? { origin_cluster_id } : null),
					...(destination_cluster_id ? { destination_cluster_id } : null),
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [selected_agent_id, trigger]);

	return {
		getRollingForecastPortPairs,
		data,
		loading,
	};
};

export default useGetRollingForecastPortPairs;
