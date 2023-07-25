import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateCheckoutInvoice = ({ setShowAddInvoicingPartyModal = () => {}, getCheckoutInvoices = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_checkout_invoice',
		method : 'POST',
	}, { manual: true });

	const createCheckoutInvoice = async ({ values }) => {
		try {
			await trigger({
				data: values,
			});

			getCheckoutInvoices();

			Toast.success('Invoice create successfully');

			setShowAddInvoicingPartyModal(false);
		} catch (err) {
			if (err.response) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	return {
		createCheckoutInvoice,
		loading,
	};
};

export default useCreateCheckoutInvoice;
