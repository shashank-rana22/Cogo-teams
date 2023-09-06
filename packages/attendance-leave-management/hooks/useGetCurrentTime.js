import { useEffect, useState } from 'react';

const CLOCK_INTERVAL = 1000;
const DEFAULT_VALUE = 10;
const DEFAULT_HOURS = 12;

function formatWithLeadingZero(value) {
	return value < DEFAULT_VALUE ? `0${value}` : value.toString();
}

function getCurrentTimeInHourFormat(date) {
	const hours = date.getHours();
	const ampm = hours >= DEFAULT_HOURS ? 'PM' : 'AM';
	const formattedHours = formatWithLeadingZero(hours % DEFAULT_HOURS || DEFAULT_HOURS);
	const minutes = formatWithLeadingZero(date.getMinutes());
	const seconds = formatWithLeadingZero(date.getSeconds());

	return `${formattedHours} : ${minutes} : ${seconds} ${ampm}`;
}

function useGetCurrentTime() {
	const [dateState, setDateState] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDateState(new Date()), CLOCK_INTERVAL);
		return function cleanup() {
			clearInterval(timer);
		};
	}, []);

	const formattedTime = getCurrentTimeInHourFormat(dateState);

	return formattedTime;
}

export default useGetCurrentTime;
