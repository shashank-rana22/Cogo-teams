// import OTPLayout from '@cogo/business-modules/components/OTPLayout';
// import Layout from '@cogo/business-modules/form/Layout';
import { InputController } from '@cogoport/forms';
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
		onSubmit = () => {},
		// onErrors = () => {},
		// showEnterOtpComponent = false,
		// otpNumber = '',
		// setOtpNumber = () => {},
		// verifyMobileNumberAPI = {},
		// sendOtpNumber = () => {},
		// verifyOtpNumber = () => {},
		actualControl,
		// errors = {},
		handleSubmit = () => {},
	} = useMobileNoVerification({ selectedUser, type });

	// const { fields = {}, handleSubmit = () => {} } = formProps;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Mobile Number Verification</div>

			<div className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				{/* <Layout controls={controls} fields={fields} errors={errors} /> */}

				<InputController
					control={actualControl}
					name="mobileNumber"
				/>

				{/* {showEnterOtpComponent && (
					<div className={styles.otp_container}>
						<OTPLayout
							otpLength={OTP_LENGTH}
							setOtpValue={setOtpNumber}
							loading={false}
							sendOtp={(obj) => sendOtpNumber({ ...obj })}
						/>
					</div>
				)} */}

				{/* {!showEnterOtpComponent && (
					<div
						className={styles.button}
						type="submit"
						size="lg"
						disabled={verifyMobileNumberAPI.loading}
					>
						Get OTP
					</div>
				)} */}

				{/* {showEnterOtpComponent && (
					<div
						// className={styles.button}
						type="submit"
						size="lg"
						onClick={verifyOtpNumber}
						disabled={verifyMobileNumberAPI.loading || otpNumber?.length !== 4}
					>
						Submit
					</div>
				)} */}
			</div>
		</div>
	);
}

export default MobileVerification;
