import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import AllInvoices from './All_Invoices/index';
import AutoJobClosure from './AutoJobClosure/index';
import Dashboard from './Dashboard';
import usePurchaseViewStats from './hook/getPurchaseViewStats';
import Rejected from './Rejected';
import styles from './styles.module.css';

function CoeFinance() {
	const { query, push } = useRouter();
	const [filters, setFilters] = useState({ timePeriod: 'day' });
	const { statsData, statsCOEApprovedData, statsLoading } = usePurchaseViewStats({ filters });
	const [activeTab, setActiveTab] = useState(query.active_tab || 'dashboard');
	const handleTabChange = (tab) => {
		setActiveTab(tab);
		setFilters({});
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
					onChange={(tab) => handleTabChange(tab)}
					fullWidth
					themeType="primary"
				>
					<TabPanel
						className={styles.tab_panel_dashboard}
						name="dashboard"
						title="Dashboard"
					>
						<Dashboard
							statsData={statsData}
							statsCOEApprovedData={statsCOEApprovedData}
							filters={filters}
							setFilters={setFilters}
							statsLoading={statsLoading}
						/>
					</TabPanel>
					<TabPanel name="all_invoices" title="All Invoices">
						<AllInvoices statsData={statsData} />
					</TabPanel>

					<TabPanel name="rejected" title="Cost Advocate">
						<Rejected statsData={statsData} />
					</TabPanel>
					<TabPanel name="auto_job_closure" title="Auto-Job Closure">
						<AutoJobClosure />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default CoeFinance;
