import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import OrganizationConfigurationPool from '../OrganizationConfigurationPool';
import ShipmentCapacityCofiguration from '../ShipmentCapacityConfiguration';

import styles from './styles.module.css';

function HomePage() {
	const { query, push } = useRouter();

	const [activeTab, setActiveTab] = useState('org_config');

	const { activeTab: currActiveTab } = query || {};

	const handleChangeTab = (val) => {
		push(`/centralised-customer-service?activeTab=${val}`);

		setActiveTab(val);
	};

	useEffect(() => {
		if (currActiveTab) setActiveTab(currActiveTab);
	}, [currActiveTab]);

	return (
		<div className={styles.container}>

			<h2 className={styles.header}>Centralised Customer Service Desk</h2>

			<div className={styles.tab_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={handleChangeTab}
				>

					<TabPanel name="org_config" title="Organization Configuration Pool">
						<OrganizationConfigurationPool />
					</TabPanel>

					<TabPanel
						name="shipment_capacity_config"
						title="Active Shipment Capacity Configuration"
					>
						<ShipmentCapacityCofiguration />
					</TabPanel>

				</Tabs>
			</div>

		</div>
	);
}

export default HomePage;
