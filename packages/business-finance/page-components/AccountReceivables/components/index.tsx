import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import Dashboard from './Dashboard';
import Outstanding from './Outstanding';
import styles from './styles.module.css';

function AccountReceivables() {
	const { push, query } = useRouter();
	const [receivables, setReceivables] = useState<string>(query.active_tab || 'dashboard');

	const profile = useSelector((state) => state);
	const { profile:{ partner } } = profile || {};
	const { id: partnerId } = partner || {};

	const handleChange = (val:string) => {
		if (['invoices', 'defaulters', 'manageBpr'].includes(val)) {
			window.location.href = `/${partnerId}/business-finance/account-receivables/${val}`;
			return;
		}
		setReceivables(val);
		push(
			'/business-finance/account-receivables/[active_tab]',
			`/business-finance/account-receivables/${val}`,
		);
	};

	return (
		<div>

			<div className={styles.header}>
				<div className={styles.header_style}>
					Account Receivables
				</div>
			</div>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={receivables}
					onChange={(val:string) => handleChange(val)}
					fullWidth
					themeType="primary"
				>
					<TabPanel name="dashboard" title="Dashboard">
						<Dashboard />
					</TabPanel>
					<TabPanel name="invoices" title="Invoices">
						--
					</TabPanel>
					<TabPanel name="outstanding" title="Outstanding">
						<Outstanding />
					</TabPanel>

					<TabPanel name="defaulters" title="Defaulters">
						--
					</TabPanel>
					<TabPanel name="manageBpr" title="Manage BPR">
						--
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default AccountReceivables;
