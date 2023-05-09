import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const updateApi = {
	bl : 'update_shipment_bl_details',
	do : 'update_shipment_do_details',
};

const useUpdateShipmentBlDoDetails = ({
	refetch = () => {},
	successMessage = 'Updated Successfully!',
	onClose = () => {},
	setShowModal = () => {},
	activeTab = '',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : `${updateApi[activeTab]}`,
		method : 'POST',
	});

	const onUpdate = async (val) => {
		try {
			await trigger({ data: val });
			Toast.success(successMessage);
			onClose();
			refetch();
			setShowModal(false);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading, onUpdate,
	};
};

export default useUpdateShipmentBlDoDetails;
