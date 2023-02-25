import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import AllInvoices from './All_Invoices/index';
import Dashboard from './Dashboard';
import Rejected from './Rejected';
import styles from './styles.module.css';

function CoeFinance() {
	const { query, push } = useRouter();
	const [activeTab, setActiveTab] = useState(query.active_tab || 'dashboard');

	const getRoute = (tab:string) => {
		if (tab === 'all_invoices') {
			return [
				'/business-finance/coe-finance/[active_tab]/purchase-view',
				`/business-finance/coe-finance/${tab}/purchase-view`,
			];
		}
		if (tab === 'rejected') {
			return [
				'/business-finance/coe-finance/[active_tab]/finance_rejected',
				`/business-finance/coe-finance/${tab}/finance_rejected`,
			];
		}
		if (tab === 'dashboard') {
			return [
				'/business-finance/coe-finance/[active_tab]',
				`/business-finance/coe-finance/${tab}`,
			];
		}
		return [
		];
	};

	const handleChange = (tab:string) => {
		setActiveTab(tab);
		push(
			getRoute(tab)[0],
			getRoute(tab)[1],
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
					onChange={(tab:string) => handleChange(tab)}
					fullWidth
					themeType="primary"
				>
					<TabPanel
						className={styles.tab_panel_dashboard}
						name="dashboard"
						title="Dashboard"
					>
						<Dashboard />
					</TabPanel>
					<TabPanel name="all_invoices" title="All Invoices">
						<AllInvoices />
					</TabPanel>

					<TabPanel name="rejected" title="Rejected">
						<Rejected />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default CoeFinance;
