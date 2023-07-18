import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateCheckoutInvoice = ({ getCheckoutInvoices = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout_invoice',
		method : 'POST',
	}, { manual: true });

	const updateCheckoutInvoice = async ({ values }) => {
		try {
			await trigger({
				data: values,
			});

			getCheckoutInvoices();

			Toast.success('Invoice deleted successfully');
		} catch (err) {
			if (err.response) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	return {
		updateCheckoutInvoice,
		loading,
	};
};

export default useUpdateCheckoutInvoice;
