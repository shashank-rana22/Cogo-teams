import React from 'react';

import styles from './styles.module.css';

function MobileView() {
	return (
		<>
			<div className={styles.card}>
				<div className={styles.attendance_date}>
					<div className={styles.attendance_day}>
						Saturday
					</div>
					Mar 01
				</div>
				<div className={styles.attendance_time}>
					<div className={styles.attendance_day}>
						Check in & out
					</div>
					9:30AM - 7:01PM
				</div>
				<div className={styles.attendance_status}>
					<div className={styles.attendance_dot} />
					Present
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.attendance_date}>
					<div className={styles.attendance_day}>
						Saturday
					</div>
					Mar 01
				</div>
				<div className={styles.attendance_time}>
					<div className={styles.attendance_day}>
						Check in & out
					</div>
					9:30AM - 7:01PM
				</div>
				<div className={styles.attendance_status}>
					<div className={styles.attendance_dot} />
					Present
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.attendance_date}>
					<div className={styles.attendance_day}>
						Saturday
					</div>
					Mar 01
				</div>
				<div className={styles.attendance_time}>
					<div className={styles.attendance_day}>
						Check in & out
					</div>
					9:30AM - 7:01PM
				</div>
				<div className={styles.attendance_status}>
					<div className={styles.attendance_dot} />
					Present
				</div>
			</div>
		</>
	);
}

export default MobileView;
