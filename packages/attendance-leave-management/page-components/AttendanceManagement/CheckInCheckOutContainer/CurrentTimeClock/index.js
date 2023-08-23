/* eslint-disable no-magic-numbers */
/* eslint-disable custom-eslint/function-name-check */
import { useEffect, useState } from 'react';

const CLOCK_INTERVAL = 1000;

function formatWithLeadingZero(value) {
	return value < 10 ? `0${value}` : value.toString();
}

function getCurrentTimeIn12HourFormat(date) {
	const hours = date.getHours();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = formatWithLeadingZero(hours % 12 || 12);
	const minutes = formatWithLeadingZero(date.getMinutes());
	const seconds = formatWithLeadingZero(date.getSeconds());

	return `${formattedHours} : ${minutes} : ${seconds} ${ampm}`;
}

function CurrentTimeClock() {
	const [dateState, setDateState] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDateState(new Date()), CLOCK_INTERVAL);
		return function cleanup() {
			clearInterval(timer);
		};
	}, []);

	const formattedTime = getCurrentTimeIn12HourFormat(dateState);

	return formattedTime;
}

export default CurrentTimeClock;
