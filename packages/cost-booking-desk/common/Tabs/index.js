import { TabPanel, Tabs as TabContainer } from '@cogoport/components';

function Tab({ tabs, activeTab, setActiveTab }) {
	const handleActiveTabChange = (val) => {
		setActiveTab(val);
	};

	console.log('activeTab', activeTab);

	return (
		<TabContainer
			themeType="primary"
			activeTab={activeTab}
			onChange={handleActiveTabChange}
		>
			{tabs.map((tab) => <TabPanel key={tab.name} {...tab} />)}
		</TabContainer>
	);
}
export default Tab;
