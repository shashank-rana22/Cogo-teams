import { getApiError } from '@cogoport/forms';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useSendInvoiceEmail = ({
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_invoice_email',
		method : 'POST',
	}, { manual: true });

	const handleSend = async ({ id }) => {
		try {
			await trigger({
				data: {
					id,
				},
			});
			refetch();
		} catch (err) {
			getApiError(err?.data?.invoice);
		}
	};

	return { handleSend, loading };
};

export default useSendInvoiceEmail;
