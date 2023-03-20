// import { TabPanel, Tabs } from '@cogoport/components';
// import { useRouter } from '@cogoport/next';
import { Toggle } from '@cogoport/components';
import React, { useState } from 'react';

// import TABS_MAPPING from '../../configs/index';
// import PropMapping from '../../constants/mappings';
import StatusComponent from '../StatusComponent';
// import { handleTabChange } from '../../utils/handleTabChange';

import styles from './styles.module.css';

function Translate() {
	const [myTranslates, setMyTranslates] = useState<string>('false');
	// const { query, push } = useRouter();
	// const { activeTab } = query;
	// const [receivables, setReceivables] = useState<string>(activeTab || 'Requested');

	return (
		<>
			<div className={styles.flex}>
				<div className={styles.heading}>Translation</div>
				<Toggle
					name="myTransilates"
					size="md"
					offLabel="My Translations"
					onLabel="All Translations"
					value={myTranslates}
					onChange={(e) => {
						setMyTranslates(e?.target?.checked ? 'true' : 'false');
					}}
				/>
			</div>
			<div className={styles.tabs}>
				{/* <Tabs
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
				</Tabs> */}
				<StatusComponent status="COMPLETED" myTranslates={myTranslates} />
			</div>
		</>
	);
}

export default Translate;
