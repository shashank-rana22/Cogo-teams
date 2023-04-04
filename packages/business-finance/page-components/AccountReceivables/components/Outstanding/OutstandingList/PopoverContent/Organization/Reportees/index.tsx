import React from 'react';

import UserCard from '../UserCard';

import styles from './styles.module.css';

function Reportees({ reportees = [] }) {
	return (
		<div className={styles.main_container}>
			<div className={styles.connecting_line} />
			<div className={styles.over_flow_div}>
				<div className={styles.container}>
					{(reportees || []).map((item) => (
						<UserCard userData={item} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Reportees;
