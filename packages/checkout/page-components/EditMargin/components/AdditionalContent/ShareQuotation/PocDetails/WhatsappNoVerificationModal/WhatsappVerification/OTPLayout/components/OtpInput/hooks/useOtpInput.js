// import { useKey } from '@cogoport/front/hooks';
import { useState, useEffect, useImperativeHandle, useRef } from 'react';

import useOtpInputEvents from './useOtpInputEvents';

const getInitialOtpValues = (otpLength) => {
	const HASH = {};

	for (let i = 0; i < otpLength; i += 1) {
		HASH[`otp-${i + 1}`] = '';
	}

	return HASH;
};

const useOtpInput = ({ otpLength = 4, onChange = () => {}, ref = null }) => {
	const [values, setValues] = useState(getInitialOtpValues(otpLength));

	const IS_BACKSPACE_PRESSED = false;

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

		for (let i = 0; i < otpLength; i += 1) {
			if (!values[`otp-${i + 1}`]) {
				isAllOtpInputValuePresent = false;
				break;
			}

			value += values[`otp-${i + 1}`];
		}

		onChange(isAllOtpInputValuePresent ? value : '');
	}, [JSON.stringify(values)]);

	useEffect(() => {
		otpInputElementsRef.current.forEach((element) => {
			element.setAttribute('maxlength', 1);
			element.setAttribute('inputmode', 'numeric');
		});
	}, [JSON.stringify(values)]);

	const handleChange = (index) => (event) => {
		setValues((previousState) => ({
			...previousState,
			[`otp-${index + 1}`]: event.target.value,
		}));

		if (IS_BACKSPACE_PRESSED) {
			return;
		}

		const nextOtpInputElement = otpInputElementsRef.current[index + 1];
		nextOtpInputElement?.focus();
	};

	const resetOtp = () => {
		setValues(getInitialOtpValues(otpLength));
	};

	const imperativeHandles = () => ({
		resetOtp,
	});

	useImperativeHandle(ref, imperativeHandles, []);

	return {
		values,
		otpContainerRef,
		otpInputElementsRef,
		handleChange,
		resetOtp,
	};
};

export default useOtpInput;
