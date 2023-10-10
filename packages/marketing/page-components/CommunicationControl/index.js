import { TabPanel, Tabs, Toggle } from '@cogoport/components';
import { useHandleVersionChangeToOld } from '@cogoport/next';
import { useState } from 'react';

import TAB_KEYS from './constants/TAB_KEYS';

function Dashboard() {
	const [activeTab, setActiveTab] = useState('channel_control');
	const { handleRouteChange } = useHandleVersionChangeToOld({});
	return (
		<div>
			<div style={{
				display        : 'flex',
				justifyContent : 'space-between',
			}}
			>
				<h1>Communication Control</h1>
				<Toggle
					size="md"
					onLabel="Old"
					offLabel="New"
					onChange={handleRouteChange}
				/>
			</div>

			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{TAB_KEYS.map((item) => {
					const { label, name, component:Component } = item;

					return (
						<TabPanel
							key={name}
							name={name}
							title={label}
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
