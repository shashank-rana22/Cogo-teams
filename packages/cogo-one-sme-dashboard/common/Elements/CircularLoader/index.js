import React from 'react';

import styles from './styles.module.css';

function CircularLoader() {
	return (
		<div className={styles.ring_loader}>
			Fetching...
			<span className={styles.ring_loader_span} />
		</div>
	);
}

export default CircularLoader;
