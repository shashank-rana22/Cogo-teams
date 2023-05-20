import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useUpdateInvoicePaymentMode = ({
	refetch = () => {},
}) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/update_invoice_payment_mode',
		method : 'POST',
	}, { manual: true });

	const changePaymentMode = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Payment mode Updated');
			refetch();
		} catch (err) {
			Toast.error(getApiError(err?.response?.data));
		}
	};

	return { changePaymentMode, loading, data };
};

export default useUpdateInvoicePaymentMode;
