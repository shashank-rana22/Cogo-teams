import { useState, useEffect, useRef } from 'react';

const GENERAL_SECONDS = 60;
const GENERAL_HOURS = 24;

const SECOND = 1000;
const MINUTE = SECOND * GENERAL_SECONDS;
const HOUR = MINUTE * GENERAL_SECONDS;
const DAY = HOUR * GENERAL_HOURS;

const getFormattedTime = (val) => Math.abs(Math.floor(val));

export default function useGetCountdown({ time, interval = SECOND }) {
	const initialTimespan = useRef(new Date(time) - Date.now());
	const currentTimespan = initialTimespan?.current;

	const [timespan, setTimespan] = useState(currentTimespan);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimespan((pv) => pv - interval);
		}, interval);

		return () => clearInterval(intervalId);
	}, [interval]);

	useEffect(() => {
		setTimespan(currentTimespan);
	}, [time, currentTimespan]);

	const days = getFormattedTime(timespan / DAY);
	const hours = getFormattedTime((timespan / HOUR) % GENERAL_HOURS);
	const minutes = getFormattedTime((timespan / MINUTE) % GENERAL_SECONDS);
	const seconds = getFormattedTime((timespan / SECOND) % GENERAL_SECONDS);

	const formattedTime = `${days || ''}${days ? 'd' : ''} ${hours}h ${minutes}m ${seconds}s`;

	return formattedTime;
}
