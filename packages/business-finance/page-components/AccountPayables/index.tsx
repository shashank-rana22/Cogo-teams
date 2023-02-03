import { Tabs, TabPanel } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import React, { useEffect, useState } from 'react';

import OverHeads from './OverHeads/index';
import styles from './styles.module.css';

function AccountPayables() {
	const [activeTab, setActiveTab] = useState('overheads');

	const [{ data, loading, error }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
		},
		{ autoCancel: false },
	);

	useEffect(() => {
		trigger();
	}, []);

	return (
		<div>
			<h1 className={styles.header}>Account Payables</h1>
			<div className={styles.underline} />

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab}
					fullWidth
					themeType="primary"
					onChange={setActiveTab}
				>
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
