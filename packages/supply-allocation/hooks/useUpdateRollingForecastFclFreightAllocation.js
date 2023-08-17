import { useRequest } from '@cogoport/request';

const useUpdateRollingForecastFclFreightAllocation = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/update_rolling_forecast_fcl_freight_allocation',
		method : 'POST',
	}, { manual: true });

	const updateRollingForecastFclFreightAllocation = async () => {
		try {
			await trigger({});
		} catch (err) {
			console.error(err);
		}
	};

	return {
		data,
		loading,
		updateRollingForecastFclFreightAllocation,
	};
};

export default useUpdateRollingForecastFclFreightAllocation;
