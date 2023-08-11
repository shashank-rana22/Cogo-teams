import { TabPanel, Tabs } from '@cogoport/components';
import React from 'react';

function ActiveInactiveTabs({ activeTab, setActiveTab }) {
	return (
		<div>
			<Tabs themeType="primary" activeTab={activeTab} onChange={setActiveTab}>
				<TabPanel name="active" title="Active" />
				<TabPanel name="inactive" title="Inactive" />
			</Tabs>
		</div>
	);
}

export default ActiveInactiveTabs;
