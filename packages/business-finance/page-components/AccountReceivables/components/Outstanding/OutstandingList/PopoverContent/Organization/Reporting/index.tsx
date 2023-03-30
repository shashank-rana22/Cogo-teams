import React from 'react';

import UserCard from '../UserCard';

import styles from './styles.module.css';

interface Props {
	reportingManagers? : object[],
	user?:object,
}
function Reporting({ reportingManagers = [], user = {} }: Props) {
	return (
		<div className={styles.container}>
			{(reportingManagers || []).map((item) => (
				<div className={styles.card_container}>
					<UserCard userData={item} />
				</div>
			))}
			<div className={styles.connector} />
			<div className={styles.card_container}>
				<UserCard userData={user} type="active" />
			</div>

		</div>
	);
}

export default Reporting;
