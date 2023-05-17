import React from 'react';

import ServiceItem from './ServiceItem';
import styles from './styles.module.css';

function SuggestedServices() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Recommended Services
				{' '}
				<span style={{ fontWeight: 400 }}>(optional)</span>
			</div>

			<div className={styles.service_container}>
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
			</div>
		</div>
	);
}

export default SuggestedServices;
