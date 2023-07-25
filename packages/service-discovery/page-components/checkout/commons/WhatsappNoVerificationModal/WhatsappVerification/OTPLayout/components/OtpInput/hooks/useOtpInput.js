import { useState, useEffect, useImperativeHandle, useRef, useCallback } from 'react';

import useOtpInputEvents from './useOtpInputEvents';

const INDEX_TO_VALUE_DIFF = 1;

const INPUT_MAX_LEN = 1;

const getInitialOtpValues = (otpLength) => {
	const HASH = {};

	for (let i = 0; i < otpLength; i += INDEX_TO_VALUE_DIFF) {
		HASH[`otp-${i + INDEX_TO_VALUE_DIFF}`] = '';
	}

	return HASH;
};

const useOtpInput = ({ otpLength = 4, onChange = () => {}, ref = null, verifyOtpNumber = () => {} }) => {
	const [values, setValues] = useState(getInitialOtpValues(otpLength));

	const IS_BACKSPACE_PRESSED = false;

	const otpContainerRef = useRef(null);
	const otpInputElementsRef = useRef([]);

	useOtpInputEvents({
		otpLength,
		setOtp: setValues,
		otpContainerRef,
		otpInputElementsRef,
		verifyOtpNumber,
	});

	useEffect(() => {
		let isAllOtpInputValuePresent = true;
		let value = '';

		for (let i = 0; i < otpLength; i += INDEX_TO_VALUE_DIFF) {
			if (!values[`otp-${i + INDEX_TO_VALUE_DIFF}`]) {
				isAllOtpInputValuePresent = false;
				break;
			}

			value += values[`otp-${i + INDEX_TO_VALUE_DIFF}`];
		}

		onChange(isAllOtpInputValuePresent ? value : '');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	useEffect(() => {
		otpInputElementsRef.current.forEach((element) => {
			element.setAttribute('maxlength', INPUT_MAX_LEN);
			element.setAttribute('inputmode', 'numeric');
		});
	}, [values]);

	const handleChange = (index) => (value) => {
		setValues((previousState) => ({
			...previousState,
			[`otp-${index + INDEX_TO_VALUE_DIFF}`]: value,
		}));

		if (IS_BACKSPACE_PRESSED) {
			return;
		}

		const nextOtpInputElement = otpInputElementsRef.current[index + INDEX_TO_VALUE_DIFF];
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
