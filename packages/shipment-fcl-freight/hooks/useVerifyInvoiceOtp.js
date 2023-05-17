import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useVerifyInvoiceOtp = ({
	otpValue = '',
	invoice = {},
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/verify_invoice_approval_otp',
		method : 'POST',
	}, { manual: true });

	const onClickSubmitOtp = async () => {
		try {
			const payload = {
				mobile_otp : otpValue,
				invoice_id : invoice?.id,
			};

			const res = await trigger({
				data: payload,
			});
			if (!res?.hasError) {
				Toast.success('OTP verified successfully!');
				refetch();
			}
		} catch (err) {
			toastApiError(err?.data?.mobile_otp);
		}
	};

	return {
		otpValue,
		verifyInvoiceLoader: loading,
		onClickSubmitOtp,
	};
};

export default useVerifyInvoiceOtp;
