import React from 'react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				No record found
			</div>
		</div>
	);
}

export default EmptyState;
