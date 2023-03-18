import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import React, { useEffect, useState } from 'react';

import OverHeads from './OverHeads/index';
import styles from './styles.module.css';

function AccountPayables() {
	const { query, push } = useRouter();
	const [activeTab, setActiveTab] = useState(query.active_tab || 'dashboard');

	const [{ data, loading, error }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
		},
		{ autoCancel: false },
	);

	console.log('api->', { data, loading, error });

	useEffect(() => {
		trigger();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (tab) => {
		setActiveTab(tab);
		push(
			'/business-finance/account-payables/[active_tab]',
			`/business-finance/account-payables/${tab}`,
		);
	};

	return (
		<div>
			<h1 className={styles.header}>Account Payables</h1>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={(tab) => handleChange(tab)}
				>
					<TabPanel name="dashboard" title="Dashboard">
						<div>No data :)</div>
					</TabPanel>
					<TabPanel name="overheads" title="Overheads">
						<OverHeads />
					</TabPanel>

					<TabPanel name="others" title="Others">
						<div>No data :)</div>
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default AccountPayables;
