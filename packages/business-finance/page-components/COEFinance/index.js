import { Placeholder, Select, TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import AllInvoices from './All_Invoices/index';
import AutoJobClosure from './AutoJobClosure/index';
import Dashboard from './Dashboard';
import usePurchaseViewStats from './hook/getPurchaseViewStats';
import Rejected from './Rejected';
import ShipmentAuditFunction from './ShipmentAuditFunctions';
import styles from './styles.module.css';
import { entityType } from './utils/constants/entityOptions';

function CoeFinance() {
	const { query, push } = useRouter();
	const [filters, setFilters] = useState({ timePeriod: 'day' });
	const { statsData, statsCOEApprovedData, statsLoading } = usePurchaseViewStats({ filters });
	const [activeTab, setActiveTab] = useState(query.active_tab || 'dashboard');
	const [entityCode, setEntityCode] = useState('301');
	const handleTabChange = (tab) => {
		setActiveTab(tab);
		setFilters({});
		push(
			'/business-finance/audit-function/[active_tab]',
			`/business-finance/audit-function/${tab}`,
		);
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>
					Shipment Audit Function

				</div>
				{statsLoading ? (
					<Placeholder width="200px" height="30px" />
				) : (
					<div className={styles.input}>
						{['operational_close', 'financial_close'].includes(activeTab) ? (
							<Select
								name="business_name"
								onChange={(entityVal) => setEntityCode(entityVal || '')}
								value={entityCode}
								options={entityType}
								placeholder="Select Entity Code"
								size="sm"
							/>
						) : null}
					</div>
				)}
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

					<TabPanel name="operational_close" title="Operational Close">
						<ShipmentAuditFunction
							activeTab={activeTab}
							entityCode={entityCode}
						/>
					</TabPanel>

					<TabPanel name="financial_close" title="Financial Close">
						<ShipmentAuditFunction
							activeTab={activeTab}
							entityCode={entityCode}
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
