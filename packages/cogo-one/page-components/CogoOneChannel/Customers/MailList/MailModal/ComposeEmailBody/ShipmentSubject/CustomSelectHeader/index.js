import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function CustomSelectHeader({
	setActiveTab = () => {},
	activeTab = '',
}) {
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="shipment" title="SIDs" />
				<TabPanel name="quotation" title="Quotations" />
				<TabPanel name="others" title="Others" />
			</Tabs>
		</div>
	);
}

export default CustomSelectHeader;
