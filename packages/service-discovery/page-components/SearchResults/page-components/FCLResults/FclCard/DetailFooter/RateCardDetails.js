import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function RateCardDetails({ TABS_MAPPING, activeTab, setActiveTab }) {
	return (
		<div className={styles.containerDetails}>

			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				fullWidth
				className={styles.tabs_style}
			>
				{Object.values(TABS_MAPPING).map((tabItem) => {
					const { key, label, component: ActiveComponent, props } = tabItem;

					return (
						<TabPanel key={key} name={key} title={label}>
							<ActiveComponent {...props} />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default RateCardDetails;
