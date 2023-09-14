import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useBulkUpdateFclFreightAllocation = ({
	refetchServiceProvidersData = () => { },
	refetchBucketsData = () => { },
	reset = () => { },
}) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/bulk_update_rolling_forecast_fcl_freight_allocation',
			method : 'POST',
		},
		{ manual: true },
	);

	const bulkUpdateFclFreightAllocation = async ({ payload }) => {
		try {
			await trigger({ data: payload });
			reset();
			refetchBucketsData();
			refetchServiceProvidersData();
			Toast.success('Allocation Updated Successfully');
		} catch (err) {
			console.error(err);
			Toast.error('Something went wrong');
		}
	};

	return {
		data,
		bulkUpdateLoading: loading,
		bulkUpdateFclFreightAllocation,
	};
};

export default useBulkUpdateFclFreightAllocation;
