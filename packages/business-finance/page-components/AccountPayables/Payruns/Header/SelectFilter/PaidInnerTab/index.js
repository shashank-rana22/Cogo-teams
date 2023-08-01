import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import { PAID_INNER_TAB_MAPPING } from '../../../constants';
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
						{PAID_INNER_TAB_MAPPING.map((tab) => (
							<TabPanel title={tab.title} name={tab.name} key={tab.name} />
						))}
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
