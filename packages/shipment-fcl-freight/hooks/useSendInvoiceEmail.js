import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
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
			Toast.success('Email Send Successfully');
			refetch();
		} catch (err) {
			Toast.error(getApiError(err?.response?.data));
		}
	};

	return { handleSend, loading };
};

export default useSendInvoiceEmail;
