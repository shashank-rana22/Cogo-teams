// import OtpInput from '@cogo/business-modules/components/OTPLayout/components/OtpInput';
import { Button } from '@cogoport/components';
import React from 'react';

import styles from '../styles.module.css';

const OTP_LENGTH = 4;

function Step2({
	selectedUser = {},
	setOTPValue = () => {},
	otpValue = '',
	verifyInvoiceLoader = false,
	sendOtpForInvoiceApproval = () => {},
	onClickSubmitOtp = () => {},
}) {
	return (
		<div>
			<div className={styles.Container}>
				Enter OTP sent to
				{' '}
				{selectedUser?.split('_')?.[1]}
				{' '}
				registered mobile
				number
			</div>

			<div className={styles.Container}>
				{/* <OtpInput
					otpLength={OTP_LENGTH}
					value={otpValue}
					onChange={(value) => {
						setOTPValue(value?.length === OTP_LENGTH ? `${value}` : '');
					}}
				/> */}
			</div>

			<div className={styles.Actions}>
				<Button
					className="primary md"
					onClick={() => onClickSubmitOtp()}
					disabled={verifyInvoiceLoader}
				>
					SUBMIT
				</Button>

				<Button
					className="secondary md"
					style={{ border: 'none' }}
					onClick={() => sendOtpForInvoiceApproval()}
				>
					Resend OTP
				</Button>
			</div>
		</div>
	);
}

export default Step2;
