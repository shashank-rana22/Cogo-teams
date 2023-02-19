import { Loader } from '@cogoport/components';
import { MobileNumberController } from '@cogoport/forms';
import OTPLayout from '@cogoport/forms/page-components/Business/OTPLayout';
import React from 'react';

import styles from './styles.module.css';

const OTP_LENGTH = 4;

function MobileVerification({
	controls,
	setOtpNumber,
	sendOtpNumber,
	actualControl,
	handleSubmit,
	onSubmit,
	showEnterOtpComponent,
	loading,

}) {
	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader className={styles.loader} />
			</div>
		);
	}
	return (
		<div className={styles.container}>

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

			</div>
		</div>
	);
}

export default MobileVerification;
