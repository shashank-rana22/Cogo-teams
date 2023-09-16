import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useSendInvoiceToFinance = ({
	refetch = () => {},
	successMessage = 'Reload Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_invoice_combination_to_finance',
		method : 'POST',
	}, { manual: true });

	const sendInvoiceToFinance = async ({ payload }) => {
		try {
			await trigger({ data: payload });
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading, sendInvoiceToFinance,
	};
};

export default useSendInvoiceToFinance;
