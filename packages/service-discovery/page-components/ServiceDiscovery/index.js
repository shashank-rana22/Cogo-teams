import React from 'react';

import SpotSearch from './SpotSearch';
import styles from './styles.module.css';

function ServiceDiscovery() {
	return (
		<div className={styles.container}>
			<SpotSearch />
		</div>
	);
}

export default ServiceDiscovery;
