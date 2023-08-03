import TABS_CONFIG from '../config/TABS_CONFIG';

export default function handleSegmentedTabChange(props) {
	const { filters = {}, setFilters, tabState = {}, setTabState, newSegmentedTab } = props || {};

	if (newSegmentedTab === tabState.segmentedTab) {
		return;
	}

	const { isCriticalOn, page, ...restFilters } = filters || {};

	const { stepperTab } = tabState || {};
	let { activeTab } = tabState || {};

	const { tabs } = TABS_CONFIG[stepperTab].segmented_tabs[newSegmentedTab] || {};

	const [defaultActiveTab] = tabs;
	const { name: defualtTab, isCriticalVisible } = (tabs || []).find(
		(tab) => tab.name === activeTab,
	) || defaultActiveTab;
	activeTab = defualtTab;

	setTabState({
		stepperTab,
		segmentedTab: newSegmentedTab,
		activeTab,
	});

	setFilters({
		...restFilters,
		...(isCriticalVisible && { isCriticalOn }),
		page: 1,
	});
}
