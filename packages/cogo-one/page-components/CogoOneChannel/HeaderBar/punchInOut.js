import { Button, cl, Placeholder } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';
import TimelineContent from './timelineContent';

const MIN_TIMER_VALUE = 0;
const PUNCH_IN_TIME_HOUR = 9;
const PUNCH_IN_TIME_MINUTE = 30;
const PUNCH_OUT_TIME_HOUR = 18;
const PUNCH_OUT_TIME_MINUTE = 30;
const MIN_SECOND = 0;
const COUNT_DOWN_BUFFER_TIME = 120;
const UPDATE_TIME_BY_ONE_SECOND = 1000;
const MAX_SECOND_VALUE = 60;
const TWO_DIGIT_NUMBER = 2;

const formatTime = (seconds) => {
	const mins = Math.floor(seconds / MAX_SECOND_VALUE);
	const secs = seconds % MAX_SECOND_VALUE;
	return `${mins.toString().padStart(TWO_DIGIT_NUMBER, '0')}:${secs.toString().padStart(TWO_DIGIT_NUMBER, '0')}`;
};

function PunchInOut({
	timelineLoading = false,
	preferenceLoading = false,
	showDetails = false,
	setShowDetails = () => {},
	status = '',
	setIsShaking = () => {},
	shakeButton = () => {},
	handlePunchIn = () => {},
	handlePunchOut = () => {},
	loading = false,
	isShaking = false,
	lastBreakTime = '',
	showStats = false,
}) {
	const [punchConfig, setPunchConfig] = useState({
		showTimer     : false,
		showEndButton : false,
	});
	const [countdown, setCountdown] = useState(MIN_TIMER_VALUE);

	const startShift = useCallback(() => {
		const currentTime = new Date();
		const startTime = new Date();
		startTime.setHours(PUNCH_IN_TIME_HOUR, PUNCH_IN_TIME_MINUTE, MIN_SECOND, MIN_SECOND);

		const timeDiff = startTime - currentTime;

		let timerFunction;

		if (timeDiff < MIN_SECOND && status === 'punched_out') {
			setIsShaking(false);
		} else {
			timerFunction = setTimeout(shakeButton, timeDiff);
		}

		return () => clearTimeout(timerFunction);
	}, [setIsShaking, shakeButton, status]);

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date();
			const targetTime = new Date();

			targetTime.setHours(PUNCH_OUT_TIME_HOUR, PUNCH_OUT_TIME_MINUTE, MIN_SECOND, MIN_SECOND);

			const remainingTime = Math.floor((targetTime - currentTime) / UPDATE_TIME_BY_ONE_SECOND);

			if (remainingTime <= COUNT_DOWN_BUFFER_TIME && remainingTime > MIN_SECOND) {
				setPunchConfig({
					showTimer     : true,
					showEndButton : false,
				});
				setCountdown(remainingTime);
			} else if (remainingTime <= MIN_SECOND) {
				setPunchConfig({
					showTimer     : false,
					showEndButton : true,
				});
				setCountdown(MIN_SECOND);
			} else {
				setPunchConfig({
					showTimer     : false,
					showEndButton : false,
				});
				setCountdown(remainingTime);
			}
		}, UPDATE_TIME_BY_ONE_SECOND);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		startShift();
	}, [startShift]);

	if (status === 'on_leave') {
		return null;
	}

	return (
		<div
			role="presentation"
			className={styles.minimize_container}
			onClick={() => {
				if (!showStats) {
					return;
				}
				setShowDetails((prev) => !prev);
			}}
		>
			{status === 'punched_out' ? (
				<Button
					size="xs"
					onClick={handlePunchIn}
					disabled={loading}
					className={cl`${isShaking ? styles.shake_button : ''}`}
				>
					Start Shift
				</Button>
			) : (
				<div className={styles.shift_time}>
					{(timelineLoading || preferenceLoading)
						? <Placeholder width="55px" height="18px" />
						: (
							<TimelineContent
								handlePunchOut={handlePunchOut}
								showTimer={punchConfig?.showTimer}
								showEndButton={punchConfig?.showEndButton}
								lastBreakTime={lastBreakTime}
								formatTime={formatTime}
								countdown={countdown}
								loading={loading}
								showStats={showStats}
							/>
						)}
				</div>
			)}
			{showStats ? <IcMArrowDown className={showDetails ? styles.up_arrow : styles.arrow_down} /> : null}
		</div>
	);
}

export default PunchInOut;
