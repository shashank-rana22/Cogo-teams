import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import PieChart from './PieChart';
import ShipmentId from './ShipmentId';
import styles from './styles.module.css';

function RiskProneShipments() {
	const [activeTab, setActiveTab] = useState('container_movement');
	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.header}>
					Risk Prone Shipments
				</div>
				<div className={styles.hr} />
			</div>
			<div className={styles.tab}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					<TabPanel name="container_movement" title="Container Movement" badge={3} />

					<TabPanel name="bl_do_release" title="BL/DO Release" badge={21} />

					<TabPanel name="both" title="Both" badge={21} />
				</Tabs>
			</div>
			<div className={styles.tab}>
				<PieChart activeTab={activeTab} />
			</div>
			<div className={styles.tab}>
				<ShipmentId />
			</div>
		</div>
	);
}

export default RiskProneShipments;
