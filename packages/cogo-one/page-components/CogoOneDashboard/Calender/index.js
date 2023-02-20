import React from 'react';

import styles from './styles.module.css';

const date = [];
function Calender() {
	return (
		<>
			{
		date.map((index) => (
			<div className={styles.card}>
				<div className={styles.date}>{index}</div>

				<div className={styles.day}>Fri</div>
			</div>
		))
		}

		</>
	);
}

export default Calender;
