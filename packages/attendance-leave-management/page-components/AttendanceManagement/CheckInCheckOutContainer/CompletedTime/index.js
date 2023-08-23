/* eslint-disable no-magic-numbers */
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function CompletedTime({ checkInTimeStr, checkOutTimeStr }) {
	const [timeElapsed, setTimeElapsed] = useState({ hours: 0, minutes: 0, seconds: 0 });

	const formatTimeUnit = (value) => (value < 10 ? `0${value}` : value.toString());

	useEffect(() => {
		const updateElapsedTime = () => {
			const currentTime = new Date();
			const checkInTime = new Date(checkInTimeStr);
			const checkoutTime = checkOutTimeStr ? new Date(checkOutTimeStr) : currentTime;

			const timeDifferenceMs = checkoutTime - checkInTime;
			const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
			const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

			setTimeElapsed({ hours, minutes, seconds });
		};

		updateElapsedTime(); // Call once immediately
		const interval = setInterval(updateElapsedTime, 10000); // Update every 10 seconds

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
