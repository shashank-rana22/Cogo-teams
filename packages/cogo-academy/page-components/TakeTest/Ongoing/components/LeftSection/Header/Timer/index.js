import { Image } from '@cogoport/next';
import { useRef, useEffect } from 'react';

import handleTimer from './handleTimer';
import styles from './styles.module.css';

function Timer({ test_start_time, duration,	setShowTimeOverModal }) {
	const timerRef = useRef(null);

	useEffect(() => {
		const interval = setInterval(() => {
			const time = handleTimer(
				test_start_time,
				duration,
				setShowTimeOverModal,
			);

			if (time) {
				timerRef.current.innerText = time;
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [test_start_time, duration, setShowTimeOverModal]);

	return (
		<div className={styles.container}>
			<Image
				width={24}
				height={24}
				src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/timer-icon1.svg"
				alt="timer"
			/>

			<div ref={timerRef} className={styles.timer} />
		</div>
	);
}

export default Timer;
