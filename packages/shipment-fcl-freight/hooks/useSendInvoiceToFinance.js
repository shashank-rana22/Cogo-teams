import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useSendInvoiceToFinance = ({
	refetch = () => {},
	successMessage = 'Reload Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_invoice_combination_to_finance',
		method : 'POST',
	});

	const sendInvoiceToFinance = async ({ payload }) => {
		try {
			const res = await trigger({ data: payload });

			Toast.success(successMessage);

			refetch();

			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading, sendInvoiceToFinance,
	};
};

export default useSendInvoiceToFinance;
