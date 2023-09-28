import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function AttendanceStats() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Attendance Stats
			</div>
			<div className={styles.summary}>
				<div className={cl`${styles.avg_data} ${styles.mr_30}`}>
					<div className={styles.avg_summary}>
						3 hrs
					</div>
					Avg hrs/day
				</div>
				<div className={styles.avg_data}>
					<div className={styles.avg_summary}>
						82%
					</div>
					Avg hrs/day
				</div>
			</div>
			<div className={styles.avg_data}>
				The last leave you took was 16 days back, we appreciate your efforts 🙌
			</div>
		</div>
	);
}

export default AttendanceStats;
