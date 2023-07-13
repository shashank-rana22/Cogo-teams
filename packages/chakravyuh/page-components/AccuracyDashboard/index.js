import React from 'react';

import DashboardView from './Dashboard';
import Filters from './Filters';
import styles from './styles.module.css';

function AccuracyDashboard() {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Price Accuracy Dashboard</h1>
			<Filters />
			<DashboardView />
		</div>
	);
}

export default AccuracyDashboard;
