import React, { useEffect } from 'react';

import styles from './styles.module.css';

const DEFAULT_TIME = 500;
const TIMER_SLICE = -2;
const TIME_SEC = 60;
const MILI_SEC = 1000;
const MIN_IN_MILI_SEC = 60000;

function VideoCallTimer({ callingRoomDetails = {}, time = 0, setTime = () => {} }) {
	const { call_status = '' } = callingRoomDetails || {};

	useEffect(() => {
		let interval = null;

		if (call_status === 'accepted') {
			interval = setInterval(() => {
				setTime((prev) => prev + DEFAULT_TIME);
			}, DEFAULT_TIME);
		}
		return () => {
			clearInterval(interval);
		};
	}, [call_status, setTime]);

	return (
		<div className={styles.stop_watch}>
			{`0${Math.floor((time / MIN_IN_MILI_SEC) % TIME_SEC)}`.slice(TIMER_SLICE)}
			<span>:</span>
			{`0${Math.floor((time / MILI_SEC) % TIME_SEC)}`.slice(TIMER_SLICE)}
		</div>
	);
}

export default VideoCallTimer;
