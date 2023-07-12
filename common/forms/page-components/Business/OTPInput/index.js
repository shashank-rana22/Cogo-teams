import React, { useEffect, useRef, useState } from 'react';

import OtpInput from './components/OtpInput';
import useTimer from './hooks/useTimer';
import styles from './styles.module.css';

const TIME_TEXT_TEN_SECONDS = 10;
const TIME_TEXT_TWENTY_SECONDS = 20;
const TIME_VALUE_ONE_SECOND = 1;

function Timer({ timer }) {
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

	useEffect(() => {
		timer.start();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className={styles.timer_text}>
			<div className={`${styles[color_text]}`}>
				{timer.minutes}
				:
				{timer.seconds}
			</div>

		</div>
	);
}
function TimerContainer({
	resendOtpTimerDuration,
	sendOtp,
	useImperativeHandleRef,
	loading,
	manualOtpRequest = false,
}) {
	const [isOtpRequestManual, setIsOtpRequestManual] = useState(
		manualOtpRequest || false,
	);
	const timer = useTimer({ durationInSeconds: resendOtpTimerDuration });

	const onClickResetOtpButton = () => {
		sendOtp({ timer });

		useImperativeHandleRef.current?.resetOtp();

		if (isOtpRequestManual) {
			setIsOtpRequestManual(false);
		}
	};
	return (
		<div className={styles.resend_otp_container}>

			<div
				role="presentation"
				onClick={() => onClickResetOtpButton()}
				disabled={
                    (isOtpRequestManual ? !timer.isTimeRemaining : timer.isTimeRemaining) || loading
                }
			>
				{isOtpRequestManual ? <div className={styles.resend_text}>Request OTP</div> : (
					<div>
						{timer.seconds >= TIME_VALUE_ONE_SECOND
							? (<Timer timer={timer} />)
							: <div className={styles.resend_text}>Resend OTP?</div>}
					</div>
				)}
			</div>

		</div>
	);
}

function OTPInput({
	otpLength,
	setOtpValue = () => { },
	loading = false,
	sendOtp = () => { },
	resendOtpTimerDuration = 30,
	placeholder = ' ',
	manualOtpRequest = false,

}) {
	const useImperativeHandleRef = useRef({});

	const handleChange = (value) => {
		setOtpValue(value.length === otpLength ? `${value}` : '');
	};

	return (
		<div className={styles.container}>
			<OtpInput
				otpLength={otpLength}
				inputSize="lg"
				onChange={(value) => handleChange(value)}
				ref={useImperativeHandleRef}
				placeholder={placeholder}
			/>
			<TimerContainer
				resendOtpTimerDuration={resendOtpTimerDuration}
				sendOtp={sendOtp}
				useImperativeHandleRef={useImperativeHandleRef}
				loading={loading}
				manualOtpRequest={manualOtpRequest}
			/>
		</div>
	);
}

export default OTPInput;
