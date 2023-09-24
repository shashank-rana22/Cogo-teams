import { toastApiError } from '@cogoport/air-modules';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentReopenJob = ({
	id = '',
	shipment_id = '',
	setFinJobOpenConfirmation = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url          : '/update_shipment',
		method       : 'POST',
		service_name : 'shipment',
	}, { manual: true });

	const handleConfirm = async () => {
		try {
			await trigger({
				params: {
					id                                 : shipment_id,
					performed_by_user_id               : id,
					revert_financially_closed_shipment : true,
				},
			});
			Toast.success('Shipment Reopened');
			setFinJobOpenConfirmation(false);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		handleConfirm,
		loading,
	};
};

export default useUpdateShipmentReopenJob;
