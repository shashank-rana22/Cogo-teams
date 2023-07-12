import React from 'react';

import Accuracy from './Accuracy';
import Deviation from './Deviation';
import Distribution from './Distribution';
import Filters from './Filters';
import styles from './styles.module.css';
import Views from './Views';

function AccuracyDashboard() {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Price Accuracy Dashboard</h1>
			<Filters />
			<div className={styles.main_container}>
				<div className={styles.graph_container}>
					<Accuracy />
					<Deviation />
				</div>
				<div className={styles.side_container}>
					<Views />
					<Distribution />
				</div>
			</div>
		</div>
	);
}

export default AccuracyDashboard;
