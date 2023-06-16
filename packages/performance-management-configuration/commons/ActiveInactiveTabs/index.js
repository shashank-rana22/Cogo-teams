import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ActiveInactiveTabs({ activeTab, setActiveTab }) {
	return (
		<div className={styles.tabs}>
			<Tabs themeType="tertiary" activeTab={activeTab} onChange={setActiveTab}>
				<TabPanel name="active" title="Active" />
				<TabPanel name="inactive" title="Inactive" />
			</Tabs>
		</div>
	);
}

export default ActiveInactiveTabs;
