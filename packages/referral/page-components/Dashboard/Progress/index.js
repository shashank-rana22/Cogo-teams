import React from 'react';

import Cogopoints from './Cogopoints';
import LoadingState from './LoadingState';
import Networks from './Networks';
import styles from './styles.module.css';
import Users from './Users';

function Progress() {
	const loading = false;
	if (loading) {
		return (
			<LoadingState />
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.users}>
				<Users />
			</div>
			<div className={styles.cogopoints}>
				<Cogopoints />
			</div>
			<div className={styles.networks}>
				<Networks />
			</div>
		</div>
	);
}

export default Progress;
