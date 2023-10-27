import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function CountDownTimer({ updatedAt = '' }) {
	const inputDate = new Date(updatedAt);

	const addedDate = new Date(inputDate.getTime() + 35 * 60000);

	const currentDate = new Date();
	const timeDifferenceInMinutes = Math.floor((addedDate - currentDate) / 60000);

	const [countdown, setCountdown] = useState(timeDifferenceInMinutes);

	useEffect(() => {
		setCountdown(timeDifferenceInMinutes);
	}, [timeDifferenceInMinutes]);

	useEffect(() => {
		if (countdown > 0) {
			const intervalId = setInterval(() => {
				setCountdown(countdown - 1);
			}, 60000);

			return () => clearInterval(intervalId);
		}

		return () => {};
	}, [countdown]);

	if (countdown < 0 || Number.isNaN(countdown)) return null;

	return (
		<div className={styles.container}>
			Next Update in
			{' '}
			<span className={styles.digit}>{Math.floor(countdown / 10)}</span>
			<span className={styles.digit}>{countdown % 10}</span>
			<span className={styles.timer}>mins</span>
		</div>
	);
}

export default CountDownTimer;
