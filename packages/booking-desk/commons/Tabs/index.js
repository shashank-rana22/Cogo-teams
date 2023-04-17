import { TabPanel, Tabs as TabContainer } from '@cogoport/components';

export default function Tabs({ stateProps, tabs }) {
	const { activeTab, setActiveTab, filters, setFilters } = stateProps;
	const { isCriticalOn, ...rest } = filters;

	const handleActiveTabChange = (val) => {
		const is_critical_visible = !!tabs
			.find((tab) => tab.name === val).isCriticalVisible;

		setActiveTab(val);
		setFilters({ ...rest, ...(is_critical_visible && { isCriticalOn }), page: 1 });
	};

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
