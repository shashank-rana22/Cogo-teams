import { useEffect, useState } from 'react';

const CLOCK_INTERVAL = 1000;

function CurrentTimeClock() {
	const [dateState, setDateState] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDateState(new Date()), CLOCK_INTERVAL);
		return function cleanup() {
			clearInterval(timer);
		};
	}, []);

	return dateState.toLocaleString('en-US', {
		hour   : 'numeric',
		minute : 'numeric',
		second : 'numeric',
		hour12 : true,
	});
}

export default CurrentTimeClock;
