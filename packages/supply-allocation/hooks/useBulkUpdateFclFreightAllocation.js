import { useRequest } from '@cogoport/request';

const useBulkUpdateFclFreightAllocation = ({
	refetchServiceProvidersData = () => { },
	refetchBucketsData = () => { },
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
			refetchBucketsData();
			refetchServiceProvidersData();
		} catch (err) {
			console.error(err);
		}
	};

	return {
		data,
		bulkUpdateLoading: loading,
		bulkUpdateFclFreightAllocation,
	};
};

export default useBulkUpdateFclFreightAllocation;
