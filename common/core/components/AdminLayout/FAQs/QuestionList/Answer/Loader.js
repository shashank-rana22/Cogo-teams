import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<>
			<div className={styles.skeleton_container_one}>
				<Placeholder width="200px" height="16px" />
			</div>
			<div className={styles.skeleton_container_two}>
				<Placeholder width="95%" height="20px" />
			</div>
			<div className={styles.skeleton_container_mid}>
				<Placeholder width="95%" height="20px" />
			</div>
			<div className={styles.skeleton_container_mid}>
				<Placeholder width="95%" height="20px" />
			</div>
			<div className={styles.skeleton_container_mid}>
				<Placeholder width="70%" height="20px" />
			</div>
			<div className={styles.skeleton_container_two}>
				<Placeholder width="200px" height="16px" />
			</div>
		</>
	);
}

export default Loader;
