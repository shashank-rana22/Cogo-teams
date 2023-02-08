// import OTPLayout from '@cogo/business-modules/components/OTPLayout';
// import Layout from '@cogo/business-modules/form/Layout';
import React from 'react';

// import { Container, Title, Form, Button, OtpContainer } from './styles';
import styles from './styles.module.css';
import useMobileNoVerification from './useMobileNoVerification';

// const OTP_LENGTH = 4;

function MobileVerification({ selectedUser = {}, type = '' }) {
	const {
		// controls = [],
		// formProps = {},
		// errors = {},
		// onSubmit = () => {},
		// onErrors = () => {},
		// showEnterOtpComponent = false,
		otpNumber = '',
		// setOtpNumber = () => {},
		// verifyMobileNumberAPI = {},
		// sendOtpNumber = () => {},
		// verifyOtpNumber = () => {},
	} = useMobileNoVerification({ selectedUser, type });

	console.log('otpNumber', otpNumber);

	// const { fields = {}, handleSubmit = () => {} } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Mobile Number Verification</div>

			{/* <div className={styles.form} onSubmit={handleSubmit(onSubmit, onErrors)}>
				<Layout controls={controls} fields={fields} errors={errors} />

				{showEnterOtpComponent && (
					<div className={styles.otp_container}>
						<OTPLayout
							otpLength={OTP_LENGTH}
							setOtpValue={setOtpNumber}
							loading={false}
							sendOtp={(obj) => sendOtpNumber({ ...obj })}
						/>
					</div>
				)}

				{!showEnterOtpComponent && (
					<div className={styles.button}
						type="submit"
						size="lg"
						disabled={verifyMobileNumberAPI.loading}
					>
						Get OTP
					</div>
				)}

				{showEnterOtpComponent && (
					<div className={styles.button}
						type="submit"
						size="lg"
						onClick={verifyOtpNumber}
						disabled={verifyMobileNumberAPI.loading || otpNumber?.length !== 4}
					>
						Submit
					</div>
				)}
			</div> */}
		</div>
	);
}

export default MobileVerification;
