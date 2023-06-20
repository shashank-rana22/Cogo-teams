/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useRef, useEffect, useCallback } from 'react';

const NEW_STATE_VALUES = {};
const START_INDEX_OF_CONTENT = 0;
const VARIABLE_STATE = 1;

const useOtpInputEvents = ({
	otpLength = 0,
	setOtp = () => {},
	otpContainerRef = null,
	otpInputElementsRef = [],
}) => {
	const isCtrlDown = useRef(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const validateInputKeydownEvent = useCallback((event) => {
		if (Number.isInteger(+event.key)) {
			return;
		}

		if (event.key === 'Backspace') {
			if (event.target.value) {
				return;
			}

			const currentFocusedOtpInputElementIndex = otpInputElementsRef.current.indexOf(event.target);

			const nextOtpInputElementToFocus = otpInputElementsRef
				.current[currentFocusedOtpInputElementIndex - VARIABLE_STATE];
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
	});

	const validateInputPasteEvent = useCallback((event) => {
		event.preventDefault();

		try {
			let content = '';

			if (event.clipboardData) {
				content = event.clipboardData.getData('text/plain');
			} else if (window.clipboardData) {
				content = window.clipboardData.getData('Text');
			}

			content = content.replace(/[^0-9]/g, '').substring(START_INDEX_OF_CONTENT, otpLength);

			const currentFocusedOtpInputElementIndex = otpInputElementsRef.current.indexOf(event.target);

			setOtp((previousState) => {
				for (let i = START_INDEX_OF_CONTENT; i < otpLength; i += VARIABLE_STATE) {
					if (i >= currentFocusedOtpInputElementIndex) {
						NEW_STATE_VALUES[`otp-${i + VARIABLE_STATE}`] = content[i
							- currentFocusedOtpInputElementIndex] || '';
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
	});

	const validateInputs = useCallback((event) => {
		if (event.type === 'keydown') {
			validateInputKeydownEvent(event);
		}

		if (event.type === 'paste') {
			validateInputPasteEvent(event);
		}
	}, []);

	useEffect(() => {
		const events = ['keydown', 'paste'];
		events.forEach((eventType) => {
			otpContainerRef.current?.addEventListener(eventType, validateInputs);
		});

		return () => {
			events.forEach((eventType) => {
				otpContainerRef.current?.removeEventListener(eventType, validateInputs);
			});
		};
	}, []);
};

export default useOtpInputEvents;
