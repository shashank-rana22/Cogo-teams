import { useState, useEffect } from 'react';

const GENERAL_SECONDS = 60;
const GENERAL_HOURS = 24;

const SECOND = 1000;
const MINUTE = SECOND * GENERAL_SECONDS;
const HOUR = MINUTE * GENERAL_SECONDS;
const DAY = HOUR * GENERAL_HOURS;

const getFormattedTime = (val) => Math.abs(Math.floor(val));

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

	const days = getFormattedTime(timespan / DAY);
	const hours = getFormattedTime((timespan / HOUR) % GENERAL_HOURS);
	const minutes = getFormattedTime((timespan / MINUTE) % GENERAL_SECONDS);
	const seconds = getFormattedTime((timespan / SECOND) % GENERAL_SECONDS);

	const formattedTime = `${days}${days ? 'd' : ''} ${hours}h ${minutes}m ${seconds}s`;

	return formattedTime;
}
