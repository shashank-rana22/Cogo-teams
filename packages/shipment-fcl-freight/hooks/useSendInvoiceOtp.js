import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useSendInvoiceOtp = ({
	refetch = () => {},
	successMessage = 'OTP sent successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/send_invoice_approval_otp',
		method : 'POST',
	}, { manual: true });

	const sendOtpForInvoiceApproval = async (payload) => {
		try {
			await trigger({
				data: payload,
			});
			refetch();
			Toast.success(successMessage);
		} catch (err) {
			Toast.error(getApiError(err?.response?.data));
		}
	};

	return {
		loading,
		sendOtpForInvoiceApproval,
	};
};

export default useSendInvoiceOtp;
