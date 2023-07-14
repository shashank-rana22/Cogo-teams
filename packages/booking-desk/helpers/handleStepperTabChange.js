import TABS_CONFIG from '../config/TABS_CONFIG';

export default function handleStepperTabChange(props) {
	const { filters, setFilters, tabState, setTabState, newStepperTab } = props || {};

	if (newStepperTab === tabState.stepperTab) {
		return;
	}

	const { isCriticalOn, page, ...restFilters } = filters || {};

	let { segmentedTab, activeTab } = tabState || {};

	const newSegmentedTabs = Object.keys(TABS_CONFIG[newStepperTab].segmented_tabs || {});

	if (!newSegmentedTabs.includes(segmentedTab)) {
		[segmentedTab] = newSegmentedTabs;
	}

	const { tabs } = TABS_CONFIG[newStepperTab].segmented_tabs[segmentedTab] || {};

	const [defaultActiveTab] = tabs;
	const { name: defualtTab, isCriticalVisible } = (tabs || []).find(
		(tab) => tab.name === activeTab,
	) || defaultActiveTab;
	activeTab = defualtTab;

	setTabState({
		stepperTab: newStepperTab,
		segmentedTab,
		activeTab,
	});

	setFilters({
		...restFilters,
		...(isCriticalVisible && { isCriticalOn }),
		page: 1,
	});
}
