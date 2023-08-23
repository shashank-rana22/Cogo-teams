import { useRequest } from '@cogoport/request';

const useGetRollingForecastBucketsData = ({ supply_fcl_freight_search_id }) => {
	const [{ data, loading }] = useRequest(
		{
			url    : '/get_rolling_forecast_buckets_data',
			method : 'get',
			params : {
				rolling_fcl_freight_search_id: supply_fcl_freight_search_id,
			},
		},
		{ manual: false },
	);

	return {
		data,
		loading,
	};
};

export default useGetRollingForecastBucketsData;
