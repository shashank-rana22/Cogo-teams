import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetRollingForecastFclFreightData = () => {
	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/get_rolling_forecast_fcl_freight_data',
		method : 'GET',
	}, { manual: true });

	const getRollingForecastPortPairs = useCallback(({
		origin_location_id = '',
		destination_location_id,
	}) => {
		try {
			trigger({
				params: {
					origin_location_id,
					destination_location_id,
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

export default useGetRollingForecastFclFreightData;
