import { Placeholder } from '@cogoport/components';
import React from 'react';

import { dArrow } from '../../constants';

import styles from './styles.module.css';

function TimeSpent({ loading = true }) {
	return (
		<div className={styles.time_spent_container}>
			<div className={styles.left_time_spent_container}>
				<div className={styles.label}>Time spent online this month</div>
				{loading ? <Placeholder height="30px" width="100px" /> : <div className={styles.time}>5h 30min</div>}
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
