import React from 'react';

import LineChart from './Charts/LineChart';
import PieChart from './Charts/PieChart';
import styles from './styles.module.css';

function CogoPoints() {
	return (
		<div className={styles.container}>
			<div className={styles.line_chart}>
				<LineChart />
			</div>
			<div className={styles.pie_chart}>
				<PieChart />
			</div>
		</div>
	);
}

export default CogoPoints;
