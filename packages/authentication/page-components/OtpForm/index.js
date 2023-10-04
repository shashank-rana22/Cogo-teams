import { Button } from '@cogoport/components';
import OTPInput from '@cogoport/forms/page-components/Business/OTPInput';
import { IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useLoginAuthenticate from '../../hooks/useLoginAuthenticate';
import useLoginMobileAuthentication from '../../hooks/useLoginMobileAuthentication';

import styles from './styles.module.css';

const OTP_LENGTH = 4;

function OtpForm({
	setMode = () => {},
	otpId = '',
	mobileNumber = {},
}) {
	const { t } = useTranslation(['login']);

	const [otpValue, setOtpValue] = useState('');

	const { onSubmit = () => {}, loading = false } = useLoginAuthenticate({
		mobileNumber,
		otpId,
		otpValue,
		type: 'otp_auth',
	});

	const {
		resendOtp = () => {},
	} = useLoginMobileAuthentication({ mobileNumber });

	return (
		<div className={styles.otp_container}>
			<span onClick={() => setMode('login')} role="presentation" className={styles.back_button}>
				<IcMArrowBack
					width="20px"
					height="20px"
					disabled={loading}
				/>
			</span>
			<div className={styles.card_heading}>{t('login:login_Otp_field_title')}</div>
			<div className={styles.card_subheading}>
				{t('login:login_otp_field_subtitle')}
				{isEmpty(mobileNumber?.number) ? (
					<>
						{' '}
						{t('login:login_otp_field_subtitle_null')}
					</>
				) : (
					<>
						{' '}
						{mobileNumber?.country_code}
						{' '}
						{mobileNumber?.number}
					</>
				)}
			</div>

			<OTPInput
				otpLength={OTP_LENGTH}
				setOtpValue={setOtpValue}
				loading={loading}
				sendOtp={resendOtp}
			/>

			<Button
				loading={loading}
				size="lg"
				className={styles.submit_button}
				onClick={(e) => {
					onSubmit({}, e);
				}}
				disabled={otpValue.length !== OTP_LENGTH}
			>
				{t('login:login_otp_field_submit_button')}
			</Button>

		</div>
	);
}

export default OtpForm;
