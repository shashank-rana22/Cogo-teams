import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetRollingForecastPortPairs = () => {
	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/get_rolling_forecast_port_pairs',
		method : 'GET',
	}, { manual: true });

	const getRollingForecastPortPairs = useCallback(({
		origin_cluster_id = '',
		destination_cluster_id = '',
	}) => {
		try {
			trigger({
				params: {
					...(origin_cluster_id ? { origin_cluster_id } : null),
					...(destination_cluster_id ? { destination_cluster_id } : null),
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [trigger]);

	return {
		getRollingForecastPortPairs,
		data,
		loading,
	};
};

export default useGetRollingForecastPortPairs;
