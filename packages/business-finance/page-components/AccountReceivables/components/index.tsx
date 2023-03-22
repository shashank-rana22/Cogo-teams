import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Outstanding from './Outstanding';
import styles from './styles.module.css';

function AccountReceivables() {
	const { push } = useRouter();
	const [receivables, setReceivables] = useState<string>('dashboard');

	const handleChange = (val:string) => {
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
					<TabPanel name="outstanding" title="OUTSTANDING">
						<Outstanding />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
}

export default AccountReceivables;
