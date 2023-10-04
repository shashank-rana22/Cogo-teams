import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import AllInvoices from './All_Invoices/index';
import AutoJobClosure from './AutoJobClosure/index';
import Dashboard from './Dashboard';
import usePurchaseViewStats from './hook/getPurchaseViewStats';
import Rejected from './Rejected';
import ShipmentAuditFunction from './ShipmentAuditFunctions';
import styles from './styles.module.css';

function CoeFinance() {
	const { query, push } = useRouter();
	const [filters, setFilters] = useState<any>({ timePeriod: 'day' });
	const { statsData, statsCOEApprovedData, statsLoading } = usePurchaseViewStats({ filters });
	const [activeTab, setActiveTab] = useState(query.active_tab || 'dashboard');
	const handleTabChange = (tab:string) => {
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
					Shipment Audit Function
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
						<Dashboard
							statsData={statsData}
							statsCOEApprovedData={statsCOEApprovedData}
							filters={filters}
							setFilters={setFilters}
							statsLoading={statsLoading}
						/>
					</TabPanel>

					<TabPanel name="operational_close" title="Operational Close">
						<ShipmentAuditFunction activeTab={activeTab} />
					</TabPanel>

					<TabPanel name="financial_close" title="Financial Close">
						<ShipmentAuditFunction activeTab={activeTab} />
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
