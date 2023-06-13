import { Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Chapter from './Chapter';
import Squad from './Squad';
import styles from './styles.module.css';
import SubChapter from './SubChapter';
import Tribe from './Tribe';

const TABS_MAPPING = {
	squad       : Squad,
	tribe       : Tribe,
	chapter     : Chapter,
	sub_chapter : SubChapter,
};

function TabComponent() {
	const [activeTab, setActiveTab] = useState('squad');
	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				style={{ marginBottom: 6 }}
			>
				{
					(Object.keys(TABS_MAPPING) || []).map((tab) => {
						const Component = TABS_MAPPING[tab];
						return (
							<TabPanel key={tab} name={tab} title={startCase(tab)}>
								<Component />
							</TabPanel>
						);
					})
				}

			</Tabs>
		</div>
	);
}

export default TabComponent;
