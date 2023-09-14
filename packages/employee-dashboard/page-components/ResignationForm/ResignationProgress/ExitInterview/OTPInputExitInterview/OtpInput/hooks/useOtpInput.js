import { useState, useEffect, useImperativeHandle, useRef } from 'react';

import useKey from './useKey';
import useOtpInputEvents from './useOtpInputEvents';

const ONE_FOR_LOOP = 1;
const getInitialOtpValues = (otpLength) => {
	const HASH = {};

	for (let i = 0; i < otpLength; i += ONE_FOR_LOOP) {
		HASH[`otp-${i + ONE_FOR_LOOP}`] = '';
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

		for (let i = 0; i < otpLength; i += ONE_FOR_LOOP) {
			if (!values[`otp-${i + ONE_FOR_LOOP}`]) {
				isAllOtpInputValuePresent = false;
				break;
			}

			value += values[`otp-${i + ONE_FOR_LOOP}`];
		}

		onChange(isAllOtpInputValuePresent ? value : '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(values)]);

	useEffect(() => {
		otpInputElementsRef.current.forEach((element) => {
			element.setAttribute('maxlength', ONE_FOR_LOOP);
			element.setAttribute('inputmode', 'numeric');
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(values)]);

	const handleChange = (index) => (event) => {
		setValues((previousState) => ({
			...previousState,
			[`otp-${index + ONE_FOR_LOOP}`]: event,
		}));

		if (isBackSpacePressed) {
			return;
		}

		const nextOtpInputElement = otpInputElementsRef.current[index + ONE_FOR_LOOP];
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
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
