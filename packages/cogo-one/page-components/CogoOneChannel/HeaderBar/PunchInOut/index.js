import { Button, cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDown, IcMArrowDown } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState, useEffect, useCallback } from 'react';

import useUpdateAgentWorkPreferences from '../../../../hooks/UseUpdateAgentWorkPreferences';

import ShowMoreStats from './ShowMoreStats';
import styles from './styles.module.css';
import TimelineContent from './TimelineContent';

const MIN_FEEDBACK_SCORE = 0;
const MIN_TIMER_VALUE = 0;
const PUNCH_IN_TIME = 9;
const PUNCH_OUT_TIME = 19;
const MIN_SECOND = 0;
const COUNT_DOWN_BUFFER_TIME = 900;
const UPDATE_TIME_BY_ONE_SECOND = 1000;
const MAX_SECOND_VALUE = 60;
const TWO_DIGIT_NUMBER = 2;

function PunchInOut({
	fetchworkPrefernce = () => {},
	agentStatus = {},
	data = {},
	agentTimeline = () => {},
	timelineLoading = false,
	preferenceLoading = false,
}) {
	const { status = '' } = agentStatus || {};
	const { list = [] } = data || {};

	const [showDetails, setShowDetails] = useState(false);
	const [isShaking, setIsShaking] = useState(false);
	const [showTimer, setShowTimer] = useState(false);
	const [showEndButton, setShowEndButton] = useState(false);
	const [countdown, setCountdown] = useState(MIN_TIMER_VALUE);

	const lastBreakTime = list?.[GLOBAL_CONSTANTS.zeroth_index]?.break_started_at;

	const {
		updateWorkPreference = () => {},
		loading = false,
	} = useUpdateAgentWorkPreferences({ fetchworkPrefernce, agentTimeline });

	const shakeButton = () => {
		setIsShaking(true);
	};
	const handlePunchIn = (event) => {
		event.stopPropagation();
		updateWorkPreference({ type: 'punched_in' });
	};

	const handlePunchOut = (event) => {
		event.stopPropagation();
		updateWorkPreference({ type: 'punched_out' });
		setIsShaking(false);
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / MAX_SECOND_VALUE);
		const secs = seconds % MAX_SECOND_VALUE;
		return `${mins.toString().padStart(TWO_DIGIT_NUMBER, '0')}:${secs.toString().padStart(TWO_DIGIT_NUMBER, '0')}`;
	};

	const startShift = useCallback(() => {
		const now = new Date();
		const startTime = new Date(now);
		startTime.setHours(PUNCH_IN_TIME, MIN_SECOND, MIN_SECOND, MIN_SECOND);

		const timeDiff = startTime - now;

		if (timeDiff < MIN_SECOND && status === 'punched_out') {
			setIsShaking(false);
		} else {
			setTimeout(shakeButton, timeDiff);
		}
	}, [status]);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const targetTime = new Date(now);
			targetTime.setHours(PUNCH_OUT_TIME, MIN_SECOND, MIN_SECOND, MIN_SECOND);

			const remainingTime = Math.floor((targetTime - now) / UPDATE_TIME_BY_ONE_SECOND);
			if (remainingTime <= COUNT_DOWN_BUFFER_TIME && remainingTime > MIN_SECOND) {
				setShowTimer(true);
				setShowEndButton(false);
				setCountdown(remainingTime);
			} else if (remainingTime <= MIN_SECOND) {
				setShowTimer(false);
				setCountdown(MIN_SECOND);
				setShowEndButton(true);
			} else {
				setShowTimer(false);
				setShowEndButton(false);
				setCountdown(remainingTime);
			}
		}, UPDATE_TIME_BY_ONE_SECOND);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		startShift();
	}, [startShift]);

	return (
		<div className={styles.container}>
			<div className={cl`${styles.hide_stats_section} ${showDetails ? styles.show_stats_section : ''}`}>
				{showDetails && (
					<ShowMoreStats
						setShowDetails={setShowDetails}
						showDetails={showDetails}
						updateWorkPreference={updateWorkPreference}
						loading={loading}
						punchedTime={lastBreakTime}
						status={status}
						handlePunchIn={handlePunchIn}
					/>
				)}
			</div>

			<div
				role="presentation"
				className={styles.minimize_container}
				onClick={() => setShowDetails((prev) => !prev)}
			>
				<Image src={GLOBAL_CONSTANTS.image_url.sad_icon} alt="sad-emoji" width={18} height={18} />
				<div className={styles.break_time}>{MIN_FEEDBACK_SCORE}</div>
				<IcMDown className={styles.down_icon} />
				{status === 'punched_out' || status === 'inactive' ? (
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
									showTimer={showTimer}
									showEndButton={showEndButton}
									lastBreakTime={lastBreakTime}
									formatTime={formatTime}
									countdown={countdown}
									loading={loading}
								/>
							)}
					</div>
				)}
				<IcMArrowDown className={cl`${showDetails ? styles.up_arrow : styles.arrow_down}`} />
			</div>

		</div>
	);
}

export default PunchInOut;
