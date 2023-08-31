import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateFclFreightAllocation = ({
	refetchBucketsData = () => { },
	setShowMoveSupplierModal = () => { },
	refetchServiceProvidersData = () => { },
}) => {
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
			refetchServiceProvidersData();
			setShowMoveSupplierModal((prev) => !prev);
			Toast.success('Updated Successfully!');
		} catch (err) {
			console.error(err);
			Toast.error('Something went wrong');
		}
	};

	return {
		data,
		loading,
		updateFclFreightAllocation,
	};
};

export default useUpdateFclFreightAllocation;
