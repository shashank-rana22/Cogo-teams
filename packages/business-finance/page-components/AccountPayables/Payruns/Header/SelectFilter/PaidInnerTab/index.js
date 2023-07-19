import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import SendReportButton from '../../PayrunButtons/SendReportButton';

import styles from './styles.module.css';

function PaidInnerTab({
	activePayrunTab = '', overseasData = '',
	setOverseasData = () => {}, itemData = {},
}) {
	const [showReport, setShowReport] = useState(false);
	return (
		<div className={styles.filter_container}>
			<div>
				{activePayrunTab === 'PAID' ? (
					<Tabs themeType="tertiary" activeTab={overseasData} onChange={setOverseasData}>
						<TabPanel title="Domestic" name="NORMAL" />
						<TabPanel title="Adv.Payment" name="ADVANCE_PAYMENT" />
					</Tabs>
				) : null}
			</div>
			<div>
				{ (activePayrunTab === 'PAID' && overseasData !== 'ADVANCE_PAYMENT')
					? (
						<SendReportButton
							itemData={itemData}
							activePayrunTab={activePayrunTab}
							showReport={showReport}
							setShowReport={setShowReport}
						/>
					) : null}
			</div>
		</div>
	);
}

export default PaidInnerTab;
