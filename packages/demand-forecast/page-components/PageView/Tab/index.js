import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import ForecastList from '../ForecastList';

const TABS_MAPPING = [
	{
		name      : 'port_pairs',
		title     : 'Port Pairs',
		component : ForecastList,
	},
	{
		name      : 'announcements',
		title     : 'Announcements',
		component : ForecastList,
	},
];

function Tab() {
	const [activeTab, setActiveTab] = useState('port_pairs');

	// useEffect(() => {

	// }, [activeTab]);

	return (
		<div style={{ margin: 20 }}>
			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				fullWidth
				themeType="primary"
			>
				{TABS_MAPPING.map((tabItem) => {
					const { name, title, component: Component } = tabItem;

					return (
						<TabPanel key={name} name={name} title={title}>
							<div>title</div>
							<Component {...activeTab} />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default Tab;
