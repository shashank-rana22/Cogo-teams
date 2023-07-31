import { useState } from 'react';

import Header from './Header';
import styles from './styles.module.css';

function AttendanceComponent() {
	const [selectMonth, setSelectMonth] = useState('march');
	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<Header selectMonth={selectMonth} setSelectMonth={setSelectMonth} />
			</div>
		</div>
	);
}

export default AttendanceComponent;
