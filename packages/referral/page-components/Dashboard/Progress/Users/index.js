import React from 'react';

import SemiPieChart from '../../../../common/SemiPieCharts';

import StatusDetails from './StatusDetails';
import styles from './styles.module.css';

function Users() {
	return (
		<>
			<div className={styles.title}>USERS</div>
			<div className={styles.chart_container}>
				<div className={styles.chart}>
					<SemiPieChart />
				</div>
				<div className={styles.chart_status}>
					<StatusDetails />
				</div>
			</div>
		</>
	);
}

export default Users;
