import { Tabs as TabContainer, TabPanel } from '@cogoport/components';

import tabs from '../../config/tabs.json';

export default function Tabs({ activeTab, setActiveTab }) {
	const onTabChange = (newTab) => {
		if (newTab !== activeTab) {
			setActiveTab(newTab);
		}
	};

	return (
		<TabContainer
			themeType="primary"
			activeTab={activeTab}
			onChange={onTabChange}
		>
			{tabs.map((tab) => (
				<TabPanel
					key={tab.name}
					name={tab.name}
				>
					{tab.title}
				</TabPanel>
			))}
		</TabContainer>
	);
}
