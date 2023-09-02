import { useRequest } from '@cogoport/request';

const useGetRollingForecastData = (props) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/get_rolling_forecast_fcl_freight_data',
			method : 'GET',
			params : props,
		},
		{ manual: false },
	);

	const getRollingForecastData = async ({ payload }) => {
		try {
			await trigger({ data: payload });
		} catch (err) {
			console.error(err);
		}
	};

	return {
		data,
		getRollingForecastData,
		graphDataLoading: loading,
	};
};

export default useGetRollingForecastData;
