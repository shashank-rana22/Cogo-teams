import { Toast } from '@cogoport/components';
import { useRef, useEffect, useCallback } from 'react';

const INDEX_TO_VALUE_DIFF = 1;

const ZERO_VALUE = 0;

const useOtpInputEvents = ({
	otpLength = 0,
	setOtp = () => {},
	otpContainerRef = null,
	otpInputElementsRef = [],
	verifyOtpNumber = () => {},
}) => {
	const isCtrlDown = useRef(false);

	const validateInputKeydownEvent = useCallback((event) => {
		if (Number.isInteger(+event.key)) {
			return;
		}

		if (event.key === 'Backspace') {
			const currentFocusedOtpInputElementIndex = otpInputElementsRef.current.indexOf(event.target);

			if (!currentFocusedOtpInputElementIndex) {
				return;
			}

			const nextOtpInputElementToFocus = otpInputElementsRef.current[
				currentFocusedOtpInputElementIndex - INDEX_TO_VALUE_DIFF
			];

			setTimeout(() => {
				nextOtpInputElementToFocus?.focus();
			}, ZERO_VALUE);

			return;
		}

		if (event.key === 'Enter') {
			verifyOtpNumber();
		}

		if (event.key === 'Tab') {
			return;
		}

		if (['Control', 'Meta'].includes(event.key)) {
			isCtrlDown.current = true;
		}

		if (isCtrlDown.current && event.key === 'v') {
			isCtrlDown.current = false;

			return;
		}

		event.preventDefault();
	}, [otpInputElementsRef, verifyOtpNumber]);

	const validateInputPasteEvent = useCallback((event) => {
		event.preventDefault();

		try {
			let content = '';

			if (event.clipboardData) {
				content = event.clipboardData.getData('text/plain');
			} else if (window.clipboardData) {
				content = window.clipboardData.getData('Text');
			}

			content = content.replace(/[^0-9]/g, '').substring(ZERO_VALUE, otpLength);

			const currentFocusedOtpInputElementIndex = otpInputElementsRef.current.indexOf(event.target);

			setOtp((previousState) => {
				const NEW_STATE_VALUES = {};

				for (let i = 0; i < otpLength; i += INDEX_TO_VALUE_DIFF) {
					if (i >= currentFocusedOtpInputElementIndex) {
						const currentValue = content[i - currentFocusedOtpInputElementIndex] || '';
						NEW_STATE_VALUES[`otp-${i + INDEX_TO_VALUE_DIFF}`] = currentValue;
					}
				}

				return {
					...previousState,
					...NEW_STATE_VALUES,
				};
			});
		} catch (error) {
			Toast.info('Copy-Paste not working');
		}
	}, [otpInputElementsRef, otpLength, setOtp]);

	const validateInputs = useCallback((event) => {
		if (event.type === 'keydown') {
			validateInputKeydownEvent(event);
		}

		if (event.type === 'paste') {
			validateInputPasteEvent(event);
		}
	}, [validateInputKeydownEvent, validateInputPasteEvent]);

	useEffect(() => {
		const events = ['keydown', 'paste'];

		const currentRef = otpContainerRef.current;

		events.forEach((eventType) => {
			currentRef?.addEventListener(eventType, validateInputs);
		});

		return () => {
			events.forEach((eventType) => {
				currentRef?.removeEventListener(eventType, validateInputs);
			});
		};
	}, [otpContainerRef, validateInputs]);
};

export default useOtpInputEvents;
