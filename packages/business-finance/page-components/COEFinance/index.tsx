import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import AllInvoices from './All_Invoices/index';
import Dashboard from './Dashboard';
import usePurchaseViewStats from './hook/getPurchaseViewStats';
import Rejected from './Rejected';
import styles from './styles.module.css';

function CoeFinance() {
	const { query, push } = useRouter();
	const { statsData } = usePurchaseViewStats();
	const [activeTab, setActiveTab] = useState(query.active_tab || 'dashboard');
	const handleTabChange = (tab:string) => {
		setActiveTab(tab);
		push(
			'/business-finance/coe-finance/[active_tab]',
			`/business-finance/coe-finance/${tab}`,
		);
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>
					COE Finance

				</div>
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
						name="dashboard"
						title="Dashboard"
					>
						<Dashboard statsData={statsData} />
					</TabPanel>
					<TabPanel name="all_invoices" title="All Invoices">
						<AllInvoices statsData={statsData} />
					</TabPanel>

					<TabPanel name="rejected" title="Rejected">
						<Rejected statsData={statsData} />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default CoeFinance;
