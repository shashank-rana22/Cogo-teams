import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import TABS_MAPPING from '../../configs/index';

import styles from './styles.module.css';

function TranslateAR() {
	const { push, query } = useRouter();
	const { activeTab } = query;
	const [receivables, setReceivables] = useState(activeTab || 'pending');
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
			<div className={styles.tabs}>
				<Tabs
					activeTab={receivables}
					onChange={handleTabChange}
					themeType="primary"
					id="translate_tab_view"
					size="lg"
				>
					{TABS_MAPPING.map(({ label = '', value = '', Component }) => (
						<TabPanel name={value} title={label}>
							<Component {...PropMapping[value as keyof typeof PropMapping]} />
						</TabPanel>
					))}
				</Tabs>
			</div>
		</>
	);
}

export default TranslateAR;
