import React, { useEffect, useRef } from 'react';

import styles from './styles.module.css';

const MILI_SECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
const MILI_SECONDS_IN_A_HOUR = 1000 * 60 * 60;
const MILI_SECONDS_IN_A_MINUTES = 1000 * 60;
const MILI_SECONDS_IN_A_SECONDS = 1000;

function EwayTimer({ data = {} }) {
	const handleTimer = (end_date) => {
		const timeNow = new Date().getTime();
		const countDownDate = new Date(end_date).getTime();

		const difference = Math.abs(countDownDate - timeNow);

		let days = Math.floor(difference / MILI_SECONDS_IN_A_DAY);
		const hours = Math.floor((difference % MILI_SECONDS_IN_A_DAY) / MILI_SECONDS_IN_A_HOUR) || '00';
		const minutes =	Math.floor((difference % MILI_SECONDS_IN_A_HOUR) / MILI_SECONDS_IN_A_MINUTES) || '00';
		const seconds = Math.floor((difference % MILI_SECONDS_IN_A_MINUTES) / MILI_SECONDS_IN_A_SECONDS) || '00';

		if (days) {
			days = `${days} ${days > 1 ? 'Days' : 'Day'}`;
		} else days = '';

		return `${days}${' '}${hours}:${minutes}:${seconds} ${
			hours > 1 ? 'Hrs' : 'Hr'
		}`;
	};

	const timerRef = useRef(null);

	useEffect(() => {
		let time = null;
		const interval = setInterval(() => {
			time = handleTimer(data);

			if (time) {
				timerRef.current.innerText = time;
			}
		}, 1000);

		return () => clearInterval(interval);
	});

	if (!data) {
		return <>-</>;
	}
	return <div className={styles.timer} ref={timerRef} />;
}
export default EwayTimer;
