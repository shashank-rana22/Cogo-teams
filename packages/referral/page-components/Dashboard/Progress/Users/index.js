import React from 'react';

import SemiPieChart from '../../../../common/SemiPieCharts';
import getFormatedChartData from '../../../../utils/getFormatedChartData';

import StatusDetails from './StatusDetails';
import styles from './styles.module.css';

function Users({ userData = {} }) {
	const { usersData = [] } = getFormatedChartData(userData);
	return (
		<>
			<div className={styles.title}>USERS</div>
			<div className={styles.chart_container}>
				<div className={styles.chart}>
					<SemiPieChart usersData={usersData} />
				</div>
				<div className={styles.chart_status}>
					<StatusDetails userData={userData} />
				</div>
			</div>
		</>
	);
}

export default Users;
