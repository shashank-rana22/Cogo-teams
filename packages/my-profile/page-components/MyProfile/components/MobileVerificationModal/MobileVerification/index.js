import { Button } from '@cogoport/components';
import { MobileNumberController } from '@cogoport/forms';
import OTPLayout from '@cogoport/forms/page-components/Business/OTPLayout';
import React from 'react';

import styles from './styles.module.css';
import useMobileNoVerification from './useMobileNoVerification';

const OTP_LENGTH = 4;

function MobileVerification({ selectedUser = {}, type = '' }) {
	const {
		controls = [],
		onSubmit = () => {},
		showEnterOtpComponent = false,
		otpNumber = '',
		setOtpNumber = () => {},
		sendOtpNumber = () => {},
		verifyOtpNumber = () => {},
		actualControl,
		handleSubmit = () => {},
		loading = false,
	} = useMobileNoVerification({ selectedUser, type });

	return (
		<div className={styles.container}>
			<div className={styles.title}>Mobile Number Verification</div>

			<div className={styles.form} onSubmit={handleSubmit(onSubmit)}>

				<MobileNumberController
					{...controls[0]}
					control={actualControl}
					name="mobileNumber"
				/>

				{showEnterOtpComponent && (
					<div className={styles.otp_container}>
						<OTPLayout
							otpLength={OTP_LENGTH}
							setOtpValue={setOtpNumber}
							loading={false}
							sendOtp={(obj) => sendOtpNumber({ ...obj })}
							placeholder=" "
						/>
					</div>
				)}

				{!showEnterOtpComponent && (
					<Button
						className={styles.button}
						type="submit"
						size="lg"
						onClick={handleSubmit(onSubmit)}
						disabled={loading}
					>
						Get OTP
					</Button>
				)}

				{showEnterOtpComponent && (
					// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					<Button
						className={styles.button}
						type="submit"
						size="lg"
						onClick={verifyOtpNumber}
						disabled={loading || otpNumber?.length !== 4}
					>
						Submit
					</Button>
				)}
			</div>
		</div>
	);
}

export default MobileVerification;
