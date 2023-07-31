import { TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import { salesDashboard as configurations } from '../../configurations/sales-dashboard';

import List from './List';
import styles from './styles.module.css';

function SalesDashboard({
	importer_exporter_id = '',
	service_type = '',
	destination_location_id = '',
	origin_location_id = '',
}) {
	const allLists = configurations;

	const [activeTab, setActiveTab] = useState(allLists[GLOBAL_CONSTANTS.zeroth_index].type);

	return (
		<div className={styles.container}>
			<Tabs
				fullWidth
				themeType="secondary"
				activeTab={activeTab}
				onChange={setActiveTab}
			>
				{allLists.map((listItem) => {
					const newListItem = { ...listItem };

					const { type = '', heading = '', fields = [] } = newListItem;

					let finalFields = [...fields];

					if (['most_searched', 'most_booked'].includes(type)) {
						let btnObj = fields.filter((fieldItem) => fieldItem.func === 'renderButton');
						const remainingFields = fields.filter((fieldItem) => fieldItem.func !== 'renderButton');

						if (!importer_exporter_id) {
							btnObj = [{
								...btnObj?.[GLOBAL_CONSTANTS.zeroth_index],
								disabled : true,
								btnLabel : 'Select an Org',
							}];
						}

						finalFields = [...remainingFields, ...btnObj];
					}

					return (
						<TabPanel
							key={type}
							name={type}
							title={heading}
						>
							<List
								key={`${type}_${heading}`}
								{...newListItem}
								fields={finalFields}
								importer_exporter_id={importer_exporter_id || undefined}
								service_type={service_type || undefined}
								origin_location_id={origin_location_id || undefined}
								destination_location_id={destination_location_id || undefined}
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
