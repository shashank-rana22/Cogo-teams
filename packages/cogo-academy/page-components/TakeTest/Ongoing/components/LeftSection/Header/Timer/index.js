import { useRef, useEffect } from 'react';

import handleTimer from './handleTimer';
import styles from './styles.module.css';

function Timer({ test_start_time, duration }) {
	const timerRef = useRef(null);
	let time = null;

	useEffect(() => {
		const interval = setInterval(() => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			time = handleTimer(test_start_time, duration);

			if (time) {
				timerRef.current.innerText = time;
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className={styles.container}>
			<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg" alt="timer" />
			<div ref={timerRef} className={styles.timer} />
		</div>
	);
}

export default Timer;
