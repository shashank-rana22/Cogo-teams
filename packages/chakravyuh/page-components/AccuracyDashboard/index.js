import React from 'react';

import DashboardView from './Dashboard';
import Filters from './Filters';
import SupplyRates from './RatesList';
import styles from './styles.module.css';

function AccuracyDashboard() {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Price Accuracy Dashboard</h1>
			<Filters />
			<DashboardView />
			<SupplyRates />
		</div>
	);
}

export default AccuracyDashboard;
