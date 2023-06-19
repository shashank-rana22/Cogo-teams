import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
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
