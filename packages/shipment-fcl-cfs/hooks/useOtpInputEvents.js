import { Toast } from '@cogoport/components';
import { useRef, useEffect, useCallback } from 'react';

const EVENTS = ['keydown', 'paste'];

const STARTING_SUBSTRING_INDEX_FOR_CONTENT = 0;
const INCREMENTER_BY_ONE = 1;

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

			const currentOtpElementIndex = otpInputElementsRef.current.indexOf(event.target);

			const nextOtpInputElementToFocus = otpInputElementsRef.current[currentOtpElementIndex - INCREMENTER_BY_ONE];
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

			content = content.replace(/[^0-9]/g, '').substring(STARTING_SUBSTRING_INDEX_FOR_CONTENT, otpLength);

			const currentOtpElementIndex = otpInputElementsRef.current.indexOf(event.target);

			setOtp((previousState) => {
				const NEW_STATE_VALUES = {};

				for (let i = 0; i < otpLength; i += INCREMENTER_BY_ONE) {
					if (i >= currentOtpElementIndex) {
						NEW_STATE_VALUES[`otp-${i + INCREMENTER_BY_ONE}`] = content[i - currentOtpElementIndex] || '';
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
