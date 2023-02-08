import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import TABS_MAPPING from '../../configs/index';
import PropMapping from '../../constants/mappings';
import { handleTabChange } from '../../utils/handleTabChange';

import styles from './styles.module.css';

function TranslateAR() {
	const { query, push } = useRouter();
	const { activeTab } = query;
	const [receivables, setReceivables] = useState<string>(activeTab || 'pending');

	return (
		<>
			<div className={styles.heading}>Account Receivables - Vietnam</div>
			<div className={styles.tabs}>
				<Tabs
					activeTab={receivables}
					onChange={(val:string) => handleTabChange(val, setReceivables, push)}
					themeType="primary"
					id="translate_tab_view"
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
