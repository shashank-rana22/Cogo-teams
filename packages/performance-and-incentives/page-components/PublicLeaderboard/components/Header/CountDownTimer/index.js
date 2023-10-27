import useCountDown from '../../../hooks/useCountDown';

import styles from './styles.module.css';

function CountDownTimer({ updatedAt = '' }) {
	const { countdown } = useCountDown({ updatedAt });

	if (countdown < 0 || Number.isNaN(countdown)) return null;

	const minutes = Math.floor(countdown / 60);
	const seconds = countdown % 60;

	return (
		<div className={styles.container}>
			<div> Next Update in</div>

			<div className={styles.timer_container}>
				<div className={styles.digit}>{String(minutes).padStart(2, '0')}</div>

				<strong className={styles.divider}>:</strong>

				<div className={styles.digit}>{String(seconds).padStart(2, '0')}</div>
			</div>

		</div>
	);
}

export default CountDownTimer;
