import TABS_CONFIG from '../config/TABS_CONFIG.json';

export default function applyPopoverFilters({ stateProps, formValues, setShowPopover }) {
	const { filters, setFilters, activeTab, setActiveTab } = stateProps;

	const { isCriticalOn, ...newFilters } = { ...filters, ...formValues };

	// const tabs = TABS_CONFIG[formValues.shipment_type];
	// const newActiveTab = tabs.find((tab) => tab.name === activeTab) || tabs[0];

	// const isCriticalVisible = !!newActiveTab.isCriticalVisible;

	// if (activeTab !== newActiveTab.name) {
	// 	setActiveTab(newActiveTab.name);
	// }

	setFilters({ ...newFilters, page: 1 });
	setShowPopover(false);
}
