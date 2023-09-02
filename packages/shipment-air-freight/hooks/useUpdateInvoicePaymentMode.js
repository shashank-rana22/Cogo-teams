import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateInvoicePaymentMode = ({
	refetch = () => {},
	successMessage = 'Payment mode Updated',
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'update_shipment_invoice_payment_mode',
		method : 'POST',
	}, { manual: true });

	const changePaymentMode = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return { changePaymentMode, loading, data };
};

export default useUpdateInvoicePaymentMode;
