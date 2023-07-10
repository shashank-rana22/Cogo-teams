import React, { useEffect, useRef } from 'react';

import OtpInput from './components/OtpInput';
import useTimer from './hooks/useTimer';
import styles from './styles.module.css';

const TIME_TEXT_TEN_SECONDS = 10;
const TIME_TEXT_TWENTY_SECONDS = 20;
const TIME_VALUE_ONE_SECOND = 1;

function OTPInput({
	otpLength,
	setOtpValue = () => {},
	loading = false,
	sendOtp = () => {},
	resendOtpTimerDuration = 30,
	placeholder = ' ',
	manualOtpRequest = false,

}) {
	const useImperativeHandleRef = useRef({});

	const timer = useTimer({ durationInSeconds: resendOtpTimerDuration });

	useEffect(() => {
		if (manualOtpRequest) {
			return;
		}
		timer.start();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (value) => {
		setOtpValue(value.length === otpLength ? `${value}` : '');
	};
	let abc = 'green_text';
	const timerClass = () => {
		if (timer.seconds <= TIME_TEXT_TEN_SECONDS) {
			abc = 'red_text';
			return abc;
		}
		if (timer.seconds <= TIME_TEXT_TWENTY_SECONDS) {
			abc = 'yellow_text';
			return abc;
		}
		return abc;
	};
	const color_text = timerClass();

	return (
		<div className={styles.container}>
			<OtpInput
				otpLength={otpLength}
				inputSize="lg"
				onChange={(value) => handleChange(value)}
				ref={useImperativeHandleRef}
				placeholder={placeholder}

			/>
			{manualOtpRequest === true
				? (
					<div className={styles.resend_otp_container}>
						<div
							role="presentation"
							className={styles.resend_text}
							onClick={() => {
								sendOtp({ timer });

								useImperativeHandleRef.current?.resetOtp();
							}}
							disabled={timer.isTimeRemaining || loading}
						>
							Request OTP
						</div>
					</div>
				) : (
					<div className={styles.resend_otp_container}>

						{timer.seconds >= TIME_VALUE_ONE_SECOND
							? (
								<div className={styles.timer_text}>
									<div className={`${styles[color_text]}`}>
										{timer.minutes}
										:
										{timer.seconds}
									</div>

								</div>
							)

							: (
								<div
									role="presentation"
									className={styles.resend_text}
									onClick={() => {
										sendOtp({ timer });

										useImperativeHandleRef.current?.resetOtp();
									}}
									disabled={timer.isTimeRemaining || loading}
								>
									Resend OTP?
								</div>
							)}

					</div>
				)}

		</div>
	);
}

export default OTPInput;
