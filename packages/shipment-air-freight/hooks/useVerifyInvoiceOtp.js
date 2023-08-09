import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
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
			Toast.error(getApiError(err?.response?.data));
		}
	};

	return {
		verifyInvoiceLoader: loading,
		onClickSubmitOtp,
	};
};

export default useVerifyInvoiceOtp;
