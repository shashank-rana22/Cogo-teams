import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useVerifyInvoiceOtp = ({
	payload = {},
	refetch = () => {},
	successMessage = 'OTP verified successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/verify_invoice_approval_otp',
		method : 'POST',
	}, { manual: true });

	const onClickSubmitOtp = async () => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		verifyInvoiceLoader: loading,
		onClickSubmitOtp,
	};
};

export default useVerifyInvoiceOtp;
