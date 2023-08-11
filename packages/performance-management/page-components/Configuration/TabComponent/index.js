import { Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import ActiveTabs from './getActiveTab';
import styles from './styles.module.css';

const TABS_MAPPING = ['squad', 'tribe', 'chapter', 'sub_chapter', 'employee'];

function TabComponent() {
	const [activeTab, setActiveTab] = useState('squad');

	return (
		<div>
			<div className={styles.container}>Performance Management Configuration</div>

			<Tabs
				activeTab={activeTab}
				themeType="primary"
				fullWidth
				onChange={setActiveTab}
				style={{ marginBottom: 6 }}
			>
				{(TABS_MAPPING || []).map((tab) => (
					<TabPanel key={tab} name={tab} title={startCase(tab)}>
						<ActiveTabs source={tab} />
					</TabPanel>
				))}
			</Tabs>
		</div>
	);
}

export default TabComponent;
