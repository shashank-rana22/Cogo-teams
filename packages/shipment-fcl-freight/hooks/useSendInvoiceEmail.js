import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';


const useSendInvoiceEmail = ({
	setShow = () => {},
	invoice = {},
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_invoice_email',
		method : 'POST',
	}, { manual: true });

	const handleSend = async () => {
		try {
			const payload = { id: invoice?.id };

			const res = await trigger({
				data: payload,
			});
			if (!res?.hasError) {
				Toast.success('Email Send successfully');
				setShow(false);
				refetch();
			}
		} catch (err) {
			toastApiError(err?.data?.invoice);
		}
	};

	return { handleSend, loading };
};

export default useSendInvoiceEmail;
