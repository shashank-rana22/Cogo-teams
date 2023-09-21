import { Button } from '@cogoport/components';
import { useForm, MobileNumberController } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useTranslation } from 'next-i18next';

import useLoginMobileAuthentication from '../../hooks/useLoginMobileAuthentication';
import useMobileLoginForm from '../../hooks/useMobileLoginForm';

import styles from './styles.module.css';

function OtpBasedLoginForm({
	setMode = () => {},
	setMobileNumber = () => {},
	setOtpId = () => {},
	mobileNumber = {},
}) {
	const { t } = useTranslation(['login']);
	const geo = getGeoConstants();

	const {
		onSendOtp = () => {},
		otpLoading = false,
	} = useLoginMobileAuthentication({ setMode, setMobileNumber, setOtpId, mobileNumber });

	const { handleSubmit, control } = useForm({
		defaultValues: {
			mobile_number: { country_code: geo.country.mobile_country_code },
		},
	});

	const {
		customError = '',
		onOtpApiCall = () => {},
	} = useMobileLoginForm({ onSendOtp, t });

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onOtpApiCall)}>

			<div className={styles.input_label}>
				{t('login:mobile_title')}
			</div>

			<MobileNumberController
				control={control}
				value={mobileNumber}
				name="mobile_number"
				placeholder={t('login:login_field_mobile_placeholder')}
				rules={{ required: t('login:login_field_mobile_error') }}
			/>

			<div className={styles.errors}>
				{customError || ''}
			</div>

			<Button
				loading={otpLoading}
				className={styles.submit_button}
				type="submit"
				size="lg"
			>
				{t('login:login_field_submit_otp_button')}
			</Button>

		</form>
	);
}

export default OtpBasedLoginForm;
