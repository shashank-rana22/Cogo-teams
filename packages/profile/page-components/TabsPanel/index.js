import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import styles from './styles.module.css';
import useGetTabsMapping from './useGetTabsMapping';

function TabsPanel({ data = {}, loading = false }) {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState('personal_details');
	useEffect(() => {
		if (router.query.active_tab) {
			setActiveTab(router.query.active_tab);
		}
	}, [router.query.active_tab]);
	const tabsMapping = useGetTabsMapping(data, loading);

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
