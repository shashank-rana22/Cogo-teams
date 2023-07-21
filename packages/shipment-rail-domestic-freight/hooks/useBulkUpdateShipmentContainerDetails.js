import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useBulkUpdateShipmentContainerDetails = ({ setShow = () => {}, showBulkModal = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_container_details',
		method : 'POST',
	});

	const onBulkSubmit = async (obj) => {
		try {
			await trigger({ data: obj });
			Toast.success('Sheet successfully added');
			showBulkModal(false);
			setShow(false);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		onBulkSubmit,
	};
};

export default useBulkUpdateShipmentContainerDetails;
