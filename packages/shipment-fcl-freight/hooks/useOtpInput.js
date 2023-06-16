import { useState, useEffect, useImperativeHandle, useRef, useCallback } from 'react';

import useKey from './useKey';
import useOtpInputEvents from
	'./useOtpInputEvents';

const INCREMENT_IN_OPT_LOOP = 1;

const getInitialOtpValues = (otpLength) => {
	const OTP_HASH = {};

	for (let i = 0; i < otpLength; i += INCREMENT_IN_OPT_LOOP) {
		OTP_HASH[`otp-${i + INCREMENT_IN_OPT_LOOP}`] = '';
	}

	return OTP_HASH;
};

const useOtpInput = ({ otpLength = 4, onChange = () => {}, ref = null }) => {
	const [values, setValues] = useState(getInitialOtpValues(otpLength));

	const isBackSpacePressed = useKey('Backspace');

	const otpContainerRef = useRef(null);
	const otpInputElementsRef = useRef([]);

	useOtpInputEvents({
		otpLength,
		setOtp: setValues,
		otpContainerRef,
		otpInputElementsRef,
	});

	useEffect(() => {
		let isAllOtpInputValuePresent = true;
		let value = '';

		for (let i = 0; i < otpLength; i += INCREMENT_IN_OPT_LOOP) {
			if (!values[`otp-${i + INCREMENT_IN_OPT_LOOP}`]) {
				isAllOtpInputValuePresent = false;
				break;
			}

			value += values[`otp-${i + INCREMENT_IN_OPT_LOOP}`];
		}

		onChange(isAllOtpInputValuePresent ? value : '');
	}, [onChange, otpLength, values]);

	useEffect(() => {
		otpInputElementsRef.current.forEach((element) => {
			element.setAttribute('maxlength', INCREMENT_IN_OPT_LOOP);
			element.setAttribute('inputmode', 'numeric');
		});
	}, [values]);

	const handleChange = (index) => (event) => {
		setValues((previousState) => ({
			...previousState,
			[`otp-${index + INCREMENT_IN_OPT_LOOP}`]: event,
		}));

		if (isBackSpacePressed) {
			return;
		}

		const nextOtpInputElement = otpInputElementsRef.current[index + INCREMENT_IN_OPT_LOOP];
		nextOtpInputElement?.focus();
	};

	const resetOtp = useCallback(() => {
		setValues(getInitialOtpValues(otpLength));
	}, [otpLength]);

	const imperativeHandles = () => ({
		resetOtp,
	});

	useImperativeHandle(ref, imperativeHandles, [resetOtp]);

	return {
		values,
		otpContainerRef,
		otpInputElementsRef,
		handleChange,
		resetOtp,
	};
};

export default useOtpInput;
