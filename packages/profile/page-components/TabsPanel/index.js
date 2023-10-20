import { Tabs, TabPanel } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import useGetTabsMapping from './useGetTabsMapping';

function TabsPanel({ data = {}, loading = false, getEmployeeDetails }) {
	const [activeTab, setActiveTab] = useState('personal_details');
	const tabsMapping = useGetTabsMapping(data, loading, getEmployeeDetails);

	return (
		<div className={styles.main_container}>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					fullWidth
					onChange={setActiveTab}
				>
					{
						tabsMapping.map(({ name, title, Component }) => (
							<TabPanel name={name} title={title} key={name}>
								{Component}
							</TabPanel>
						))
					}
				</Tabs>
			</div>
		</div>
	);
}

export default TabsPanel;
