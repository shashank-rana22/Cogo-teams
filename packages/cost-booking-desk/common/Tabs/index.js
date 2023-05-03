import { TabPanel, Tabs as TabContainer } from '@cogoport/components';

function Tab({ tabs, stateProps = {} }) {
	const { activeTab, setActiveTab } = stateProps;
	const handleActiveTabChange = (val) => {
		setActiveTab(val);
	};

	console.log(activeTab, 'active');

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
