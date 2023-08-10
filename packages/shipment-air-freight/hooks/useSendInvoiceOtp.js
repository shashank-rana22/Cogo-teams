import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
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
			toastApiError(err);
		}
	};

	return {
		loading,
		sendOtpForInvoiceApproval,
	};
};

export default useSendInvoiceOtp;
