import { Tabs, TabPanel } from '@cogoport/components';
import { useState, useEffect } from 'react';

import Shipment from './Shipment';
import styles from './styles.module.css';
import Trends from './Trend';

const ATHENA_DASHBOARD_MAPPING = {
	shipments: {
		name      : 'shipments',
		title     : 'Shipments',
		Component : Shipment,
	},
	trends: {
		name      : 'trends',
		title     : 'Trends',
		Component : Trends,
	},
};

function AthenaDashboard() {
	const [activeTab, setActiveTab] = useState('shipments');

	return (
		<div>
			<div style={{ margin: 20 }}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={setActiveTab}
				>
					{Object.values(ATHENA_DASHBOARD_MAPPING).map((item) => {
						const { name = '', title = '', Component } = item;

						if (!Component) return null;

						return (
							<TabPanel
								key={name}
								name={name}
								title={title}
							>
								<Component />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</div>
	);
}
export default AthenaDashboard;
