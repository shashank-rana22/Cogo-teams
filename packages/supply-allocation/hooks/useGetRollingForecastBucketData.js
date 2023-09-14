import { useRequest } from '@cogoport/request';

const useGetRollingForecastBucketData = ({ id, bucket_type }) => {
	const [{ data, loading }, trigger] = useRequest(
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

	const refetchServiceProvidersData = async () => {
		try {
			await trigger({
				params: {
					rolling_fcl_freight_search_id: id,
					bucket_type,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};
	return {
		data,
		loading,
		refetchServiceProvidersData,
	};
};
export default useGetRollingForecastBucketData;
