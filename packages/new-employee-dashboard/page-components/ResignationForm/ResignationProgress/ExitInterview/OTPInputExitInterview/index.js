import React, { useRef } from 'react';

import OtpInput from './components/OtpInput';
import styles from './styles.module.css';

function OTPInputExitInterview({
	otpLength = 6,
	setOtpValue,
	placeholder = ' ',

}) {
	const useImperativeHandleRef = useRef({});

	const handleChange = (value) => {
		setOtpValue(value.length === otpLength ? `${value}` : '');

		console.log('Exit Interview OTP : ', value);
	};

	return (
		<div className={styles.container}>
			<OtpInput
				otpLength={otpLength}
				inputSize="sm"
				onChange={handleChange}
				ref={useImperativeHandleRef}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default OTPInputExitInterview;
