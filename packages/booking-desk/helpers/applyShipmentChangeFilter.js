import TABS_CONFIG from '../config/TABS_CONFIG.json';

const applyShipmentChangeFilter = ({ shipment_type = '', stateProps = {} }) => {
	const { filters, setFilters, activeTab, setActiveTab } = stateProps;

	const { isCriticalOn, ...restFilters } = filters || {};
	const tabs = TABS_CONFIG[shipment_type];

	const newActiveTab = tabs.find((tab) => tab.name === activeTab) || tabs[0];
	const isCriticalVisible = !!newActiveTab.isCriticalVisible;

	if (activeTab !== newActiveTab.name) {
		setActiveTab(newActiveTab.name);
	}

	if (shipment_type === 'fcl_freight_local') {
		restFilters.trade_type = '';
	}

	setFilters({
		...restFilters,
		...(isCriticalVisible && { isCriticalOn }),
		page: 1,
		shipment_type,
	});
};

export default applyShipmentChangeFilter;
