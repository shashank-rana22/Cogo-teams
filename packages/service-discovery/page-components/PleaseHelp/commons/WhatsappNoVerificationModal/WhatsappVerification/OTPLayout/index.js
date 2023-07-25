import { Button } from '@cogoport/components';
import { useEffect, useRef, useState } from 'react';

import OtpInput from './components/OtpInput';
import useTimer from './hooks/useTimer';
import styles from './styles.module.css';

function Timer({ timer = {} }) {
	return (
		<div className={styles.timer_text}>
			{timer.minutes}
			{' '}
			:
			{timer.seconds}
		</div>
	);
}

function TimerContainer({
	resendOtpTimerDuration = 0,
	sendOtp = () => {},
	useImperativeHandleRef = {},
	loading = false,
	manualOtpRequest = false,
}) {
	const [isOtpRequestManual, setIsOtpRequestManual] = useState(
		manualOtpRequest || false,
	);

	const timer = useTimer({ durationInSeconds: resendOtpTimerDuration });

	useEffect(() => {
		timer.start();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onClickResetOtpButton = () => {
		sendOtp({ timer });

		useImperativeHandleRef.current?.resetOtp();

		if (isOtpRequestManual) {
			setIsOtpRequestManual(false);
		}
	};

	return (
		<div className={styles.resend_otp_container}>
			{isOtpRequestManual ? null : <Timer timer={timer} />}

			<Button
				type="button"
				className="primary md text"
				onClick={() => onClickResetOtpButton()}
				disabled={
					(isOtpRequestManual
						? !timer.isTimeRemaining
						: timer.isTimeRemaining) || loading
				}
			>
				{isOtpRequestManual ? 'Request OTP' : 'Resend OTP?'}
			</Button>
		</div>
	);
}

function OTPLayout({
	otpLength = 4,
	setOtpValue = () => {},
	loading = false,
	sendOtp = () => {},
	resendOtpTimerDuration = 30,
}) {
	const useImperativeHandleRef = useRef({});

	return (
		<div className={styles.container}>
			<OtpInput
				otpLength={otpLength}
				inputSize="lg"
				onChange={(value) => {
					setOtpValue(value.length === otpLength ? `${value}` : '');
				}}
				ref={useImperativeHandleRef}
			/>

			<TimerContainer
				resendOtpTimerDuration={resendOtpTimerDuration}
				sendOtp={sendOtp}
				useImperativeHandleRef={useImperativeHandleRef}
				loading={loading}
				manualOtpRequest={false}
			/>
		</div>
	);
}

export default OTPLayout;
