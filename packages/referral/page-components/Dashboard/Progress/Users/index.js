import React from 'react';

import StatusDetails from './StatusDetails';
import styles from './styles.module.css';

function Users() {
	return (
		<>
			<div className={styles.title}>USERS</div>
			<div className={styles.chart_container}>
				<div className={styles.chart}>
					Chart will come here
				</div>
				<div className={styles.chart_status}>
					<StatusDetails />
				</div>
			</div>
		</>
	);
}

export default Users;
