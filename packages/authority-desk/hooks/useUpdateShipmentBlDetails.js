import { Toast } from '@cogoport/components'; 
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentBlDetails = ({
	refetch = () => {},
	successMessage = 'Updated Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_bl_details',
		method : 'POST',
	});

	const onUpdate = async (val) => {
		try {
			await trigger({ data: val });
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			 toastApiError(err);
		}
	};

	return {
		loading, onUpdate,
	};
};

export default useUpdateShipmentBlDetails;
