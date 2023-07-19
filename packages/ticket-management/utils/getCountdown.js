import { useState, useEffect } from 'react';

const GENERAL_SECONDS = 60;
const GENERAL_HOURS = 24;

const SECOND = 1000;
const MINUTE = SECOND * GENERAL_SECONDS;
const HOUR = MINUTE * GENERAL_SECONDS;
const DAY = HOUR * GENERAL_HOURS;

export default function useCountdown(time, interval = SECOND) {
	const [timespan, setTimespan] = useState(new Date(time) - Date.now());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimespan((pv) => pv - interval);
		}, interval);

		return () => clearInterval(intervalId);
	}, [interval]);

	useEffect(() => {
		setTimespan(new Date(time) - Date.now());
	}, [time]);

	const days = Math.floor(timespan / DAY);
	const hours = Math.floor((timespan / HOUR) % GENERAL_HOURS);
	const minutes = Math.floor((timespan / MINUTE) % GENERAL_SECONDS);
	const seconds = Math.floor((timespan / SECOND) % GENERAL_SECONDS);

	const formattedTime = `${days}d ${Math.abs(hours)}h ${Math.abs(minutes)}m ${Math.abs(seconds)}s`;

	return formattedTime;
}
