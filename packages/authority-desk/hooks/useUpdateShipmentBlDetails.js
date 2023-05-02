import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentBlDetails = ({
	refetch = () => {},
	successMessage = 'Updated Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_bl_details',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			await trigger({ data: val });
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			// toastApiError(err);
		}
	};

	return {
		loading, apiTrigger,
	};
};

export default useUpdateShipmentBlDetails;
