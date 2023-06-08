import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';
import CampaignManagement from './components/CampaignManagement'
import ExceptionsManagement from './components/ExceptionsManagement'
import styles from './styles.module.css';

function Dunnings() {
	const { query, push } = useRouter();	

	const [activeTab, setActiveTab] = useState(query?.active_tab|| 'campaign-management');
	const handleTabChange = (tab:string) => {
		setActiveTab(tab);
		push(
			'/business-finance/dunnings/[active_tab]',
			`/business-finance/dunnings/${tab}`,
		);
	};
	
	return (
		<div>
			<div className={styles.header}>
			Dunning
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
						name="campaign-management"
						title="Campaign Management"
					>
						<CampaignManagement/>
					</TabPanel>
					<TabPanel name="exceptions-management" title="Exceptions Management">
					<ExceptionsManagement/>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default Dunnings;
