import { useState, useEffect } from 'react';

import styles from './styles.module.css';

const THOUSAND = 1000;
const SIXTY = 60;
const TEN_THOUSAND = 10000;
const DEFAULT_VALUE_COUNT = 10;

function CompletedTime({ checkInTimeStr = '', checkOutTimeStr = '' }) {
	const [timeElapsed, setTimeElapsed] = useState({ hours: 0, minutes: 0, seconds: 0 });

	const formatTimeUnit = (value) => (value < DEFAULT_VALUE_COUNT ? `0${value}` : value.toString());

	useEffect(() => {
		const updateElapsedTime = () => {
			if (checkInTimeStr) {
				const currentTime = new Date();
				const checkInTime = new Date(checkInTimeStr);
				const checkoutTime = checkOutTimeStr ? new Date(checkOutTimeStr) : currentTime;

				const timeDifferenceMs = checkoutTime - checkInTime;
				const hours = Math.floor(timeDifferenceMs / (THOUSAND * SIXTY * SIXTY));
				const minutes = Math.floor((timeDifferenceMs % (THOUSAND * SIXTY * SIXTY)) / (THOUSAND * SIXTY));
				const seconds = Math.floor((timeDifferenceMs % (THOUSAND * SIXTY)) / THOUSAND);

				setTimeElapsed({ hours, minutes, seconds });
			} else {
				setTimeElapsed({ hours: 0, minutes: 0, seconds: 0 });
			}
		};

		updateElapsedTime(); // Call once immediately
		const interval = setInterval(updateElapsedTime, TEN_THOUSAND); // Update every 10 seconds

		return () => clearInterval(interval); // Clean up interval on component unmount
	}, [checkInTimeStr, checkOutTimeStr]);

	const { hours, minutes, seconds } = timeElapsed || {};

	return (
		<div className={styles.formatted_time}>
			{`${formatTimeUnit(hours)} : ${formatTimeUnit(minutes)} : ${formatTimeUnit(seconds)}`}
		</div>
	);
}

export default CompletedTime;
