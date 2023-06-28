import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

function useUpdateShipmentInvoice() {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_invoice_combination_edit_reason',
		method : 'POST',
	}, { manual: true });

	const udpateInvoices = async (payload, callback = () => {}) => {
		try {
			await trigger({
				data: payload,
			});
			callback();
			Toast.success('Request successful');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		updatingInvoices: loading,
		udpateInvoices,
	};
}

export default useUpdateShipmentInvoice;
