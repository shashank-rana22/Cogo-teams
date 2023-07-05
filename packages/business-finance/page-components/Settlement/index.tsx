import { Tabs, TabPanel } from '@cogoport/components';
import getEntityCode from '@cogoport/globalization/utils/getEntityCode';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import History from './page-components/History';
import JournalVoucher from './page-components/JournalVoucher';
import OnAccountCollection from './page-components/OnAccountCollection';
import TdsSettlement from './page-components/TdsSettlement';
import styles from './styles.module.css';

interface Profile {
	profile?: { partner: { id: string } };
}
function Settlement() {
	const { query, push } = useRouter();
	const { profile }:Profile = useSelector((state) => state);

	const { partner } = profile || {};

	const { id: partnerId } = partner || {};

	const entityCode = getEntityCode(partnerId);

	const [activeTab, setActiveTab] = useState(query?.active_tab);

	const handleChange = (tab: string) => {
		if (['JournalVoucher', 'tds-settlement', 'onAccountCollection', 'history'].includes(tab)) {
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
					<History />
				</TabPanel>

				<TabPanel name="onAccountCollection" title="On Account Collection">
					<OnAccountCollection />
				</TabPanel>
				<TabPanel name="JournalVoucher" title="Journal Voucher">
					<JournalVoucher entityCode={entityCode} />
				</TabPanel>
			</Tabs>
		</div>
	);
}

export default Settlement;
