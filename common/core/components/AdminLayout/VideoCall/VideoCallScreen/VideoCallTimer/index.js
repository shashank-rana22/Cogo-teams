import React, { useEffect } from 'react';

import styles from './styles.module.css';

const DEFAULT_TIME = 10;
const TIMER_SLICE = -2;
const TIME_SEC = 60;
const MILI_SEC = 1000;
const MIN_IN_MILI_SEC = 60000;

function VideoCallTimer({ peer_stream = {}, time = 0, setTime = () => {} }) {
	useEffect(() => {
		let interval = null;

		if (peer_stream) {
			interval = setInterval(() => {
				setTime((prev) => prev + DEFAULT_TIME);
			}, DEFAULT_TIME);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [peer_stream, setTime]);

	return (
		<div className={styles.stop_watch}>
			<div className={styles.timer}>
				<span className={styles.digits}>
					{`0${Math.floor((time / MIN_IN_MILI_SEC) % TIME_SEC)}`.slice(TIMER_SLICE)}
					:
				</span>
				<span className={styles.digits}>
					{`0${Math.floor((time / MILI_SEC) % TIME_SEC)}`.slice(TIMER_SLICE)}
				</span>
			</div>
		</div>
	);
}

export default VideoCallTimer;
