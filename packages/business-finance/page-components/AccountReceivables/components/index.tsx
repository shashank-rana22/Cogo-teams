import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import Outstanding from './Outstanding';
import styles from './styles.module.css';

function AccountReceivables() {
	const { push } = useRouter();
	const [receivables, setReceivables] = useState<string>('outstanding');

	const profile = useSelector((state) => state);
	const { profile:{ user } } = profile || {};
	const { id: partnerId } = user || {};

	const handleChange = (val:string) => {
		if (val === 'dashboard' || val === 'invoices' || val === 'defaulters' || val === 'manageBpr') {
			window.location.href = `/${partnerId}/business-finance/account-receivables`;
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
						--
					</TabPanel>
					<TabPanel name="invoices" title="Invoices">
						--
					</TabPanel>
					<TabPanel name="outstanding" title="OUTSTANDING">
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
