import { cl } from '@cogoport/components';
import React from 'react';

import Loader from '../../../../../common/Loader';

import styles from './styles.module.css';

function AttendanceStats({ self_working_stats = {}, loading, last_leave_taken }) {
	const { avg_work_hrs, on_time_arrival } = self_working_stats || {};

	if (loading) {
		return (
			<div className={styles.container}>
				<Loader height="20px" count={3} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Attendance Stats
			</div>
			<div className={styles.summary}>
				<div className={cl`${styles.avg_data} ${styles.mr_30}`}>
					<div className={styles.avg_summary}>
						{avg_work_hrs?.toFixed(2) || 0}
						{' '}
						hrs
					</div>
					Avg hrs/day
				</div>
				<div className={styles.avg_data}>
					<div className={styles.avg_summary}>
						{on_time_arrival || 0}
						%
					</div>
					On Time Arrival
				</div>
			</div>
			<div className={styles.avg_data}>
				{ last_leave_taken
					? `The last leave you took was ${last_leave_taken || 0} days back, we appreciate your efforts 🙌`
					: 'No leaves taken yet' }
			</div>
		</div>
	);
}

export default AttendanceStats;
