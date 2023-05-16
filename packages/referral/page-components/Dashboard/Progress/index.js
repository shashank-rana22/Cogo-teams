import React from 'react';

import Cogopoints from './Cogopoints';
import LoadingState from './LoadingState';
import Networks from './Networks';
import styles from './styles.module.css';
import Users from './Users';

function Progress({ statsLoading, statsData }) {
	const { user_data = {}, network_data = {}, cogopoint_data = {} } = statsData?.data || {};

	if (statsLoading) {
		return (
			<LoadingState />
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.users}>
				<Users userData={user_data} />
			</div>
			<div className={styles.cogopoints}>
				<Cogopoints cogopointData={cogopoint_data} />
			</div>
			<div className={styles.networks}>
				<Networks networkData={network_data} />
			</div>
		</div>
	);
}

export default Progress;
