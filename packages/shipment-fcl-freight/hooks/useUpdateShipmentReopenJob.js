import { toastApiError } from '@cogoport/air-modules';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const closeAndRefetch = ({
	setFinJobOpenConfirmation = () => {},
	refetch = () => {},
}) => {
	setFinJobOpenConfirmation(false);
	refetch();
};

const useUpdateShipmentReopenJob = ({
	shipment_id = '',
	setFinJobOpenConfirmation = () => {},
	refetch = () => {},
}) => {
	const [{ loading = false }, trigger] = useRequest({
		url          : '/update_shipment',
		method       : 'POST',
		service_name : 'shipment',
	}, { manual: true });

	const handleConfirm = async () => {
		try {
			await trigger({
				params: {
					id                                 : shipment_id,
					is_job_closed                      : false,
					revert_financially_closed_shipment : true,
				},
			});
			Toast.success('Shipment Reopened');
			closeAndRefetch({ setFinJobOpenConfirmation, refetch });
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
