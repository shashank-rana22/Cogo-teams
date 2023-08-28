import { useRequest } from '@cogoport/request';

const useUpdateFclFreightAllocation = ({ refetchBucketsData = () => {}, setShowMoveSupplierModal = () => {} }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/update_rolling_forecast_fcl_freight_allocation',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateFclFreightAllocation = async ({ payload }) => {
		try {
			await trigger({ data: payload });
			refetchBucketsData();
			setShowMoveSupplierModal(false);
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
