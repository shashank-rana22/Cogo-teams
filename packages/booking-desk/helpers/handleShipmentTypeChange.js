import TABS_CONFIG from '../config/TABS_CONFIG.json';

export default function handleShipmentTypeChange({ stateProps, newShipmentType }) {
	const { filters, setFilters, activeTab, setActiveTab } = stateProps;
	const { isCriticalOn, ...restFilters } = filters;

	const tabs = TABS_CONFIG[newShipmentType];

	const newActiveTab = tabs.find((tab) => tab.name === activeTab) || tabs[0];

	const isCriticalVisible = !!newActiveTab.criticalVisible;

	if (activeTab !== newActiveTab.name) {
		setActiveTab(newActiveTab.name);
	}

	setFilters({ ...restFilters, shipment_type: newShipmentType, ...(isCriticalVisible && { isCriticalOn }), page: 1 });
}
