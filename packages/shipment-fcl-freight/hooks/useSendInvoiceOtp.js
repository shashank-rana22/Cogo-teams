import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useSendInvoiceOtp = ({
	invoice_id = '',
	user_id = '',
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_invoice_approval_otp',
		method : 'POST',
	}, { manual: true });

	const sendOtpForInvoiceApproval = async () => {
		try {
			const payload = {
				invoice_id,
				user_id,
			};
			const res = await trigger({
				data: payload,
			});
			if (!res?.hasError) {
				refetch();
				Toast.success('OTP sent successfully!');
			}
		} catch (error) {
			toastApiError(error?.data);
		}
	};

	return {
		loading,
		sendOtpForInvoiceApproval,
	};
};

export default useSendInvoiceOtp;
