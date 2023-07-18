import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateInvoicePaymentMode = ({
	refetch = () => {},
	successMessage = 'Payment mode Updated',
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_cfs/update_invoice_payment_mode',
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
