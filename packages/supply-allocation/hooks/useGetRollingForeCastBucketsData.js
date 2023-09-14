import { useRequest } from '@cogoport/request';

const useGetRollingForecastBucketsData = ({ supply_fcl_freight_search_id }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/get_rolling_forecast_grouped_buckets_data',
			method : 'get',
			params : {
				rolling_fcl_freight_search_id: supply_fcl_freight_search_id,
			},
		},
		{ manual: false },
	);

	const refetchBucketsData = async () => {
		try {
			await trigger({
				params: {
					rolling_fcl_freight_search_id: supply_fcl_freight_search_id,
				},
			});
		} catch (err) {
			console.error(err);
		}
	};

	return {
		data,
		loading,
		refetchBucketsData,
	};
};

export default useGetRollingForecastBucketsData;
