import { useState } from 'react';

import AttendanceStats from './AttedanceStats';
import ChecInCheckOut from './CheckInCheckOutContainer';
import Header from './Header';
import styles from './styles.module.css';

function AttendanceComponent() {
	const [selectMonth, setSelectMonth] = useState('march');
	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<Header selectMonth={selectMonth} setSelectMonth={setSelectMonth} />
			</div>

			<div className={styles.body_container}>
				<div className={styles.check_in_style}>
					<ChecInCheckOut />
				</div>

				<div className={styles.attendance_stats}>
					<AttendanceStats />
				</div>
			</div>
		</div>
	);
}

export default AttendanceComponent;
