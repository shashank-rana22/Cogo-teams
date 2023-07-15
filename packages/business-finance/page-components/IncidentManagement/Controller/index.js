import React from 'react';

import CreateLevelModal from '../common/CreateForm';

import CustomTable from './CustomTable';
import styles from './styles.module.css';

function Controller() {
	return (
		<div className={styles.table}>
			<div className={styles.create}>
				<CreateLevelModal />
			</div>
			<CustomTable />
		</div>
	);
}

export default Controller;
