import React from 'react';

import UserCard from '../UserCard';

import styles from './styles.module.css';

function Reporting({ reportingManagers = [] }) {
	return (
		<div className={styles.container}>
			{(reportingManagers || []).map((item) => (
				<>
					<div className={styles.card_container}>
						<UserCard userData={item} />
					</div>
					<div className={styles.connector} />
				</>
			))}

		</div>
	);
}

export default Reporting;