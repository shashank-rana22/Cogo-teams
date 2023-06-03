import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import JournalVoucher from './page-components/JournalVoucher';
import OnAccountCollection from './page-components/OnAccountCollection';
import TdsSettlement from './page-components/TdsSettlement';
import styles from './styles.module.css';

function Settlement() {
	const { query, push } = useRouter();

	const [activeTab, setActiveTab] = useState(query?.active_tab);

	const handleChange = (tab: any) => {
		if (['JournalVoucher', 'tds-settlement', 'on-account-collection'].includes(tab)) {
			setActiveTab(tab);
			push(
				'/business-finance/settlement/[active_tab]',
				`/business-finance/settlement/${tab}`,
			);
		} else {
			window.location.href = `/${query.partner_id}/business-finance/settlement/${tab}`;
		}
	};

	return (
		<div>
			<div className={styles.main_heading}>Settlement</div>
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="primary"
				onChange={(tab) => handleChange(tab)}
			>
				<TabPanel name="ap-ar-settlement" title="AR/AP Settlement">
					-
				</TabPanel>
				<TabPanel name="tds-settlement" title="TDS Settlement">
					<TdsSettlement />
				</TabPanel>
				<TabPanel name="history" title="History">
					-
				</TabPanel>

				<TabPanel name="on-account-collection" title="On Account Collection">
					<OnAccountCollection />
				</TabPanel>
				<TabPanel name="JournalVoucher" title="Journal Voucher">
					<JournalVoucher />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Settlement;
