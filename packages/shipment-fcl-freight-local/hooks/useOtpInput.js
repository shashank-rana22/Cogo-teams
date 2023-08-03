import { useState, useEffect, useImperativeHandle, useRef, useCallback } from 'react';

import useKey from './useKey';
import useOtpInputEvents from './useOtpInputEvents';

const INCREMENT_BY_ONE = 1;
const HASH = {};

const getInitialOtpValues = (otpLength) => {
	[...Array(otpLength)].forEach((e, index) => {
		HASH[`otp-${index + INCREMENT_BY_ONE}`] = '';
	});
	return HASH;
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

		for (let i = 0; i < otpLength; i += INCREMENT_BY_ONE) {
			if (!values[`otp-${i + INCREMENT_BY_ONE}`]) {
				isAllOtpInputValuePresent = false;
				break;
			}

			value += values[`otp-${i + INCREMENT_BY_ONE}`];
		}

		onChange(isAllOtpInputValuePresent ? value : '');
	}, [onChange, otpLength, values]);

	useEffect(() => {
		otpInputElementsRef.current.forEach((element) => {
			element.setAttribute('maxlength', INCREMENT_BY_ONE);
			element.setAttribute('inputmode', 'numeric');
		});
	}, [values]);

	const handleChange = (index) => (event) => {
		setValues((previousState) => ({
			...previousState,
			[`otp-${index + INCREMENT_BY_ONE}`]: event,
		}));

		if (isBackSpacePressed) {
			return;
		}

		const nextOtpInputElement = otpInputElementsRef.current[index + INCREMENT_BY_ONE];
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
