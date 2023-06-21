import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import { salesDashboard as configurations } from '../../configurations/sales-dashboard';

import List from './List';
import styles from './styles.module.css';

function SalesDashboard({ importer_exporter_id = '' }) {
	const [selectedRow, setSelectedRow] = useState({ data: null, type: null });

	console.log('importer_exporter_id', importer_exporter_id);

	const centerLists = configurations.filter((list) => list.placement === 'center');

	const [activeTab, setActiveTab] = useState(centerLists[0].type);

	return (
		<div className={styles.container}>
			<Tabs
				fullWidth
				themeType="secondary"
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{centerLists.map((list) => {
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
								setSelectedRow={setSelectedRow}
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
