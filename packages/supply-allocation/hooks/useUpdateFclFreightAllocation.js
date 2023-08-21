import { useRequest } from '@cogoport/request';

const useUpdateFclFreightAllocation = () => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/update_rolling_forecast_fcl_freight_allocation',
		method : 'POST',
	}, { manual: true });

	const updateFclFreightAllocation = async ({ payload }) => {
		try {
			await trigger({ data: payload });
		} catch (err) {
			console.error(err);
		}
	};

	return {
		data,
		loading,
		updateFclFreightAllocation,
	};
};

export default useUpdateFclFreightAllocation;
