import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useVerifyInvoiceOtp = ({
	refetch = () => {},
	successMessage = 'OTP verified successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/verify_invoice_approval_otp',
		method : 'POST',
	}, { manual: true });

	const onClickSubmitOtp = async (payload) => {
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
