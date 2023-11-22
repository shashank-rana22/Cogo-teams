import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useCreateShipmentPlan = ({
	refetch = () => {},
	successMessage = 'Shipment Plan Created Successfully',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_plan',
		method : 'POST',
	}, { manual: true });

	const onCreate = async (data) => {
		try {
			await trigger({
				data,
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			Toast.error(getApiError(err?.response?.data));
		}
	};
	return {
		loading,
		onCreate,
	};
};

export default useCreateShipmentPlan;
