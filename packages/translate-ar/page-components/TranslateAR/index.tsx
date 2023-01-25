import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import TABS_MAPPING from '../../configs/index';

import styles from './styles.module.css';

function TranslateAR() {
	const { push, query } = useRouter();
	const { activeTab } = query;
	const [receivables, setReceivables] = useState(activeTab);
	const handleTabChange = (v: string) => {
		push(
			'/business-finance/translate-account-receivables/[activeTab]',
			`/business-finance/translate-account-receivables/${v}`,
		);
		setReceivables(v);
	};
	const PropMapping = {
		pending   : { status: 'pending' },
		completed : { status: 'completed' },
	};
	return (
		<>
			<div className={styles.heading}>Account Receivables - Vietnam</div>
			<div className={styles.hr} />
			<Tabs
				activeTab={receivables}
				onChange={handleTabChange}
				id="translate_tab_view"
			>
				{TABS_MAPPING.map(({ label = '', value = '', Component }) => (
					<TabPanel name={value} title={label}>
						<Component {...PropMapping[value as keyof typeof PropMapping]} />
					</TabPanel>
				))}
			</Tabs>
		</>
	);
}

export default TranslateAR;
