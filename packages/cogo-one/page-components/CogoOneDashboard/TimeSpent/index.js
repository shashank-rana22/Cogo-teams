import React from 'react';

import { dArrow } from '../constants';

import styles from './styles.module.css';

function TimeSpent() {
	return (
		<div className={styles.time_spent_container}>
			<div>
				<div className={styles.label}>Time spent online this month</div>
				<div className={styles.time}>5h 30min</div>

			</div>
			<div>
				<img
					src={dArrow}
					alt="-"
				/>
			</div>
		</div>

	);
}
export default TimeSpent;
