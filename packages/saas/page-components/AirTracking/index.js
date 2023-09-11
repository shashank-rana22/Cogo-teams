import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function AirTracking() {
	return (
		<div className={styles.container}>
			<header className={styles.heading_container}>
				<h1>Air Cargo Tracking</h1>

				<Button size="lg">
					<IcMPlus style={{ marginRight: 8 }} />
					Create New Tracker
				</Button>
			</header>
		</div>
	);
}

export default AirTracking;
