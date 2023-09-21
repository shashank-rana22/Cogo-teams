import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const useLoginMobileAuthentication = ({
	setMode = () => {},
	setMobileNumber = () => {},
	setOtpId = () => {},
	mobileNumber = {},
}) => {
	const { t } = useTranslation(['login']);

	const [{ loading: otpLoading }, trigger] = useRequest(
		{
			url    : 'send_login_otp',
			method : 'post',
		},
		{ manual: true },
	);

	const onSendOtp = async (values, e) => {
		e.preventDefault();
		try {
			const response = await trigger({
				data: {
					mobile_number       : values?.mobile_number?.number,
					mobile_country_code : values?.mobile_number?.country_code,
				},
			});

			setOtpId(response?.data?.id);
			setMobileNumber(values?.mobile_number);
			setMode('otp');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || t('login:login_otp_failed'),
			);
		}
	};

	const resendOtp = async ({ timer = {} }) => {
		try {
			const response = await trigger({
				data: {
					mobile_number       : mobileNumber?.number,
					mobile_country_code : mobileNumber?.country_code,
				},
			});

			setOtpId(response?.data?.id);

			Toast.success(t('login:login_otp_resend_success'));

			timer?.restart?.();
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || t('login:login_otp_failed'),
			);
		}
	};

	return { onSendOtp, otpLoading, resendOtp };
};

export default useLoginMobileAuthentication;
