import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import { salesDashboard as configurations } from '../../configurations/sales-dashboard';

import List from './List';
import styles from './styles.module.css';

const ZEROTH_INDEX = 0;

function SalesDashboard({ importer_exporter_id = '' }) {
	const lists = configurations;

	const [activeTab, setActiveTab] = useState(lists[ZEROTH_INDEX].type);

	return (
		<div className={styles.container}>
			<Tabs
				fullWidth
				themeType="secondary"
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{lists.map((list) => {
					const newList = { ...list };

					if (newList.api === 'list_shipments') {
						newList.type = 'sales_shipments';
					}

					return (
						<TabPanel
							key={newList.type}
							name={newList.type}
							title={newList.heading}
						>
							<List
								key={newList.type}
								{...newList}
								importer_exporter_id={importer_exporter_id || undefined}
								dashboard="sales"
							/>
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default SalesDashboard;
