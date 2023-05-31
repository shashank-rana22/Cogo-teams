import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentContainerDetails = ({
	refetch = () => {},
	successMessage = 'Updated Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_container_details',
		method : 'POST',
	});

	const apiTrigger = async (update_data) => {
		if (update_data?.length !== 0) {
			try {
				await trigger({ data: { update_data } });
				Toast.success(successMessage);
				refetch();
			} catch (err) {
				toastApiError(err);
			}
		} else {
			Toast.error('Update Data cannot be blank');
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateShipmentContainerDetails;
