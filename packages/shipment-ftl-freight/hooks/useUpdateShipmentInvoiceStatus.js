import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateShipmentInvoiceStatus = ({
	refetch = () => {},
	successMessage = 'Status updated successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_invoice_status',
		method : 'POST',
	});

	const apiTrigger = async ({ payload, message = '' }) => {
		try {
			await trigger({ data: payload });

			Toast.success(message || successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateShipmentInvoiceStatus;
