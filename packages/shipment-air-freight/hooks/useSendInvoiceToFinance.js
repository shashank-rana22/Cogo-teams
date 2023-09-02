import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

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
