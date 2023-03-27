import CONTROLS_CONFIG from '../config/CONTROLS_CONFIG.json';
import TABS_CONFIG from '../config/TABS_CONFIG.json';

export default function getValidatedStoredValues(storedValues, stringifiedScopeData) {
	const scopeData = JSON.parse(stringifiedScopeData);
	const filters = storedValues?.filters || {};
	let activeTab = storedValues?.activeTab;
	const scopeFilters = storedValues?.scopeFilters || {};

	const { shipment_type, trade_type, page } = filters;
	const { scope, view_type } = scopeFilters;

	const { scopes = [], viewTypes = {} } = scopeData || {};

	if (!CONTROLS_CONFIG.shipment_types.some((shipment_type_obj) => shipment_type_obj.value === shipment_type)) {
		filters.shipment_type = 'fcl_freight';
	}
	if (!CONTROLS_CONFIG.trade_types.some((trade_type_obj) => trade_type_obj.value === trade_type)) {
		filters.trade_type = undefined;
	}
	if (typeof page !== 'number') {
		filters.page = 1;
	}

	const tabs = TABS_CONFIG[filters.shipment_type];
	if (!tabs.some((tab) => tab.name === activeTab)) {
		activeTab = 'place_booking';
	}

	if (scopes.includes(scope)) {
		scopeFilters.scope = scope;
	}
	if ((viewTypes[scopeFilters.scope] || []).includes(view_type)) {
		scopeFilters.view_type = view_type;
	}

	return { filters, activeTab, scopeFilters };
}
