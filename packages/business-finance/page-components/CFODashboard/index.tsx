import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Logistics from './Logistics';
import Overheads from './Overheads';
import styles from './styles.module.css';

function CFODashboard() {
	const { query, push } = useRouter();

	const [activeTab, setActiveTab] = useState(query?.activeTab || 'logistics');
	const handleTabChange = (tab:string) => {
		setActiveTab(tab);
		push(
			'/business-finance/cfo-dashboard/[activeTab]',
			`/business-finance/cfo-dashboard/${tab}`,
		);
	};

	return (
		<div>
			<div className={styles.header}>
				Business Finance Dashboard
				{/* {query?.activeTab === 'logistics' ?
				'Business Finance Dashboard - India' : 'Business Finance Dashboard'} */}
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={(tab:string) => handleTabChange(tab)}
					fullWidth
					themeType="primary"
				>
					<TabPanel
						className={styles.tab_panel_dashboard}
						name="logistics"
						title="Logistics"
					>
						<Logistics />
					</TabPanel>
					<TabPanel name="overheads" title="Overheads">
						<Overheads />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default CFODashboard;
