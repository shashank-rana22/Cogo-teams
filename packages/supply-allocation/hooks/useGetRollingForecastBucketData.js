import { useRequest } from '@cogoport/request';

const useGetRollingForecastBucketData = ({ id, bucket_type }) => {
	const [{ data, loading }] = useRequest(
		{
			url    : '/get_rolling_forecast_bucket_data',
			method : 'get',
			params : {
				rolling_fcl_freight_search_id: id,
				bucket_type,
			},
		},
		{ manual: false },
	);

	return {
		data,
		loading,
	};
};
export default useGetRollingForecastBucketData;
