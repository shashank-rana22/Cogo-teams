import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import ShipmentCapacityCofiguration from '../ShipmentCapacityConfiguration';

import styles from './styles.module.css';

function HomePage() {
	const [activeTab, setActiveTab] = useState('shipment_capacity_configuration');

	return (
		<div className={styles.container}>

			<div className={styles.tab_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel
						name="shipment_capacity_configuration"
						title="CSD Active Shipment Capacity Configuration"
					>
						<ShipmentCapacityCofiguration />
					</TabPanel>

					<TabPanel name="csd_dashboard" title="CSD Dashboard" />

				</Tabs>
			</div>

		</div>
	);
}

export default HomePage;
