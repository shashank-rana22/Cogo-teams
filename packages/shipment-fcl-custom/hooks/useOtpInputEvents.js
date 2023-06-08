import { Toast } from '@cogoport/components';
import { useRef, useEffect, useCallback } from 'react';

const EVENTS = ['keydown', 'paste'];
const NEW_STATE_VALUES = {};
const INITIAL_STATE = 1;
const INITIAL_INDEX = 0;

const useOtpInputEvents = ({
	otpLength = 0,
	setOtp = () => {},
	otpContainerRef = null,
	otpInputElementsRef = [],
}) => {
	const isCtrlDown = useRef(false);

	const validateInputKeydownEvent = useCallback((event) => {
		if (Number.isInteger(+event.key)) {
			return;
		}

		if (event.key === 'Backspace') {
			if (event.target.value) {
				return;
			}

			const currentFocusedOtpInputElementIndex = otpInputElementsRef.current.indexOf(event.target);

			const nextOtpInputElementToFocus = otpInputElementsRef.current[currentFocusedOtpInputElementIndex - INITIAL_STATE];
			nextOtpInputElementToFocus?.focus();

			return;
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
	}, [otpInputElementsRef]);

	const validateInputPasteEvent = useCallback((event) => {
		event.preventDefault();

		try {
			let content = '';

			if (event.clipboardData) {
				content = event.clipboardData.getData('text/plain');
			} else if (window.clipboardData) {
				content = window.clipboardData.getData('Text');
			}

			content = content.replace(/[^0-9]/g, '').substring(INITIAL_INDEX, otpLength);

			const currentFocusedOtpInputElementIndex = otpInputElementsRef.current.indexOf(event.target);

			setOtp((previousState) => {
				for (let i = 0; i < otpLength; i += INITIAL_STATE) {
					if (i >= currentFocusedOtpInputElementIndex) {
						NEW_STATE_VALUES[`otp-${i + INITIAL_STATE}`] = content[i - currentFocusedOtpInputElementIndex] || '';
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
		const currentRef = otpContainerRef.current;
		EVENTS.forEach((eventType) => {
			currentRef?.addEventListener(eventType, validateInputs);
		});

		return () => {
			EVENTS.forEach((eventType) => {
				currentRef?.removeEventListener(eventType, validateInputs);
			});
		};
	}, [otpContainerRef, validateInputs]);
};

export default useOtpInputEvents;
