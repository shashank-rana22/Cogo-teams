import useKey from '@cogoport/forms/page-components/Business/OTPInput/components/OtpInput/hooks/useKey';
import { useState, useEffect, useImperativeHandle, useRef, useCallback } from 'react';

import useOtpInputEvents from './useOtpInputEvents';

const FIRST_INDEX = 1;
const INCREMENT_BY_ONE = 1;

const getInitialOtpValues = (otpLength) => {
	const HASH = {};

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

		for (let i = 0; i < otpLength; i += FIRST_INDEX) {
			if (!values[`otp-${i + FIRST_INDEX}`]) {
				isAllOtpInputValuePresent = false;
				break;
			}

			value += values[`otp-${i + FIRST_INDEX}`];
		}

		onChange(isAllOtpInputValuePresent ? value : '');
	}, [onChange, otpLength, values]);

	useEffect(() => {
		otpInputElementsRef.current.forEach((element) => {
			element.setAttribute('maxlength', FIRST_INDEX);
			element.setAttribute('inputmode', 'numeric');
		});
	}, [values]);

	const handleChange = (index) => (event) => {
		setValues((previousState) => ({
			...previousState,
			[`otp-${index + FIRST_INDEX}`]: event,
		}));

		if (isBackSpacePressed) {
			return;
		}

		const nextOtpInputElement = otpInputElementsRef.current[index + FIRST_INDEX];
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
