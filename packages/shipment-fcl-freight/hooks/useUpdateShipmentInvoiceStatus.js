import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentInvoiceStatus = ({
	refetch = () => {},
	successMessage = 'Status updated successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_invoice_status',
		method : 'POST',
	});

	const updateInvoiceStatus = async ({ payload, message = '' }) => {
		try {
			await trigger({ data: payload });

			Toast.success(message || successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateInvoiceStatus,
		loading,
	};
};

export default useUpdateShipmentInvoiceStatus;
