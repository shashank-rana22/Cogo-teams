import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

function RateCardDetails({ detailsComponentMapping, rateCardData, showDetails }) {
	console.log('showDetails', showDetails);

	const [activeTab, setActiveTab] = useState(showDetails);

	return (
		<div className={styles.containerDetails}>

			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				fullWidth
				className={styles.tabs_style}
			>
				{Object.values(detailsComponentMapping).map((tabItem) => {
					const { key, label, Component } = tabItem;

					return (
						<TabPanel key={key} name={key} title={label}>
							<Component rateCardData={rateCardData} />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default RateCardDetails;
