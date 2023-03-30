import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import Dashboard from './Dashboard';
import styles from './styles.module.css';

function AccountPayables() {
	const { query, push } = useRouter();
	const { activeTab } = query;
	const [activePayables, setActivePayables] = useState(activeTab || 'dashboard');
	const profile = useSelector((state) => state);
	const { profile:{ partner } } = profile || {};
	const { id: partnerId } = partner || {};
	const handleTabChange = (v:string) => {
		if (['invoices', 'payruns', 'outstanding', 'treasury-chest'].includes(v)) {
			window.location.href = `/${partnerId}/business-finance/account-payables/${v}`;
			return;
		}
		setActivePayables(v);
		push(
			'/business-finance/account-payables/[activeTab]',
			`/business-finance/account-payables/${v}`,
		);
	};

	return (
		<div>
			<div className={styles.heading}>
				Account Payables
			</div>
			<div className={styles.container}>
				<Tabs
					activeTab={activePayables}
					fullWidth
					themeType="primary"
					onChange={handleTabChange}
				>
					<TabPanel name="dashboard" title="DASHBOARD">
						<Dashboard />
					</TabPanel>
					<TabPanel name="invoices" title="INVOICES">
						<h1>Invoices</h1>
					</TabPanel>
					<TabPanel name="payruns" title="PAYRUN">
						<h1>Payruns</h1>
					</TabPanel>
					<TabPanel name="outstanding" title="OUTSTANDING">
						<h1>Outstandings</h1>
					</TabPanel>
					<TabPanel name="treasury-chest" title="TREASURY">
						<h1>Treasury</h1>
					</TabPanel>

				</Tabs>
			</div>
		</div>
	);
}

export default AccountPayables;
