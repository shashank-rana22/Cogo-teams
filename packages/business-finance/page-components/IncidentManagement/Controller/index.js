import React from 'react';

import CustomTable from './CustomTable';
import styles from './styles.module.css';

function Controller() {
	return (
		<div className={styles.table}>
			<CustomTable />
		</div>
	);
}

export default Controller;
