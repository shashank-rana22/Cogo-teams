import React, { useRef } from 'react';

import OtpInput from './OtpInput';
import styles from './styles.module.css';

function OTPInputExitInterview({
	otpLength = 6,
	setOtpValue = () => {},
	placeholder = ' ',
	setOtpError = () => {},
}) {
	const useImperativeHandleRef = useRef({});

	const handleChange = (value) => {
		setOtpValue(value.length === otpLength ? `${value}` : '');
		setOtpError(false);
	};

	return (
		<div className={styles.container}>
			<OtpInput
				otpLength={otpLength}
				inputSize="sm"
				onChange={(v) => handleChange(v)}
				ref={useImperativeHandleRef}
				placeholder={placeholder}
			/>
		</div>
	);
}

export default OTPInputExitInterview;
