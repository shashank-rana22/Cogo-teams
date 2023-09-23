import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import TAB_KEYS from './constants/TAB_KEYS';

function Dashboard() {
	const [activeTab, setActiveTab] = useState('channel_control');
	return (
		<div>
			<h1>Communication Control</h1>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{TAB_KEYS.map((item) => {
					const Component = item.component;
					return (
						<TabPanel
							key={item?.id}
							name={item?.name}
							title={item?.label}
						>
							<Component />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default Dashboard;
