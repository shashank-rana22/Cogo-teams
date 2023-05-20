import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useSendInvoiceEmail = ({
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_invoice_email',
		method : 'POST',
	}, { manual: true });

	const handleSend = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			refetch();
		} catch (err) {
			toastApiError(err?.data?.invoice);
		}
	};

	return { handleSend, loading };
};

export default useSendInvoiceEmail;
