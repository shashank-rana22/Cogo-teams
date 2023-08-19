import { useRequest } from '@cogoport/request';

const useBulkUpdateRollingForecastFclFreightAllocation = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/bulk_update_rolling_forecast_fcl_freight_allocation',
		method : 'POST',
	}, { manual: true });

	const bulkUpdateRollingForecastFclFreightAllocation = async ({ payload }) => {
		try {
			console.log('payload received', payload);
			await trigger({ data: payload });
		} catch (err) {
			console.error(err);
		}
	};

	return {
		data,
		loading,
		bulkUpdateRollingForecastFclFreightAllocation,
	};
};
export default useBulkUpdateRollingForecastFclFreightAllocation;
