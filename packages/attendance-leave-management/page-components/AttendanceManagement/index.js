import { useState } from 'react';

import AttendanceStats from './AttedanceStats';
import AttendanceLogs from './AttendanceLogs';
import ChecInCheckOut from './CheckInCheckOutContainer';
import Header from './Header';
import styles from './styles.module.css';
import Summary from './Summary';

function AttendanceComponent({ location }) {
	const [selectMonth, setSelectMonth] = useState('march');
	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<Header selectMonth={selectMonth} setSelectMonth={setSelectMonth} />
			</div>

			<div className={styles.body_container}>
				<div className={styles.check_in_style}>
					<ChecInCheckOut location={location} />
				</div>

				<div className={styles.attendance_stats}>
					<AttendanceStats />
				</div>
			</div>
			<div className={styles.container}>
				<AttendanceLogs />
				<Summary />
			</div>
		</div>
	);
}

export default AttendanceComponent;
