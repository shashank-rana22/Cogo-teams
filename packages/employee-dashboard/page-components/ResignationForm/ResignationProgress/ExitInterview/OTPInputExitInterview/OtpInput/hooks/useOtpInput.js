import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect, useImperativeHandle, useRef } from 'react';

import useKey from './useKey';
import useOtpInputEvents from './useOtpInputEvents';

const getInitialOtpValues = (otpLength) => {
	const HASH = {};

	for (let i = 0; i < otpLength; i += GLOBAL_CONSTANTS.one) {
		HASH[`otp-${i + GLOBAL_CONSTANTS.one}`] = '';
	}

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

		for (let i = 0; i < otpLength; i += GLOBAL_CONSTANTS.one) {
			if (!values[`otp-${i + GLOBAL_CONSTANTS.one}`]) {
				isAllOtpInputValuePresent = false;
				break;
			}

			value += values[`otp-${i + GLOBAL_CONSTANTS.one}`];
		}

		onChange(isAllOtpInputValuePresent ? value : '');
	}, [onChange, otpLength, values]);

	useEffect(() => {
		otpInputElementsRef.current.forEach((element) => {
			element.setAttribute('maxlength', GLOBAL_CONSTANTS.one);
			element.setAttribute('inputmode', 'numeric');
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(values)]);

	const handleChange = (index) => (event) => {
		setValues((previousState) => ({
			...previousState,
			[`otp-${index + GLOBAL_CONSTANTS.one}`]: event,
		}));

		if (isBackSpacePressed) {
			return;
		}

		const nextOtpInputElement = otpInputElementsRef.current[index + GLOBAL_CONSTANTS.one];
		nextOtpInputElement?.focus();
	};

	const resetOtp = () => {
		setValues(getInitialOtpValues(otpLength));
	};

	const imperativeHandles = () => ({
		resetOtp,
	});

	useImperativeHandle(
		ref,
		imperativeHandles,
	);

	return {
		values,
		otpContainerRef,
		otpInputElementsRef,
		handleChange,
		resetOtp,
	};
};

export default useOtpInput;
