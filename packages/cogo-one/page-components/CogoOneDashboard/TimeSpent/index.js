import React from 'react';

import { dArrow } from '../constants';

import styles from './styles.module.css';

function TimeSpent() {
	return (
		<div className={styles.time_spent_container}>
			<div className={styles.left_time_spent_container}>
				<div className={styles.label}>Time spent online this month</div>
				<div className={styles.time}>5h 30min</div>

			</div>
			<div className={styles.right_time_spent_container}>
				<img
					src={dArrow}
					alt="-"
					className={styles.dArrowImage}
				/>
			</div>
		</div>

	);
}
export default TimeSpent;
