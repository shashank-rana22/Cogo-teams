import React from 'react';

import Cogopoints from './Cogopoints';
import Networks from './Networks';
import styles from './styles.module.css';
import Users from './Users';

function Progress() {
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
