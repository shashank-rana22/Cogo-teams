import CONTROLS_CONFIG from '../config/CONTROLS_CONFIG.json';
import TABS_CONFIG from '../config/TABS_CONFIG.json';

export default function getValidatedStoredValues(scopeData) {
	const storedValues = JSON.parse(localStorage.getItem('booking_desk_stored_values'));

	let { shipment_type, trade_type, page } = storedValues?.filters || {};
	const { isCriticalOn, q } = storedValues?.filters || {};
	let activeTab = storedValues?.activeTab;
	let { scope, view_type } = storedValues?.scopeFilters || {};

	const { scopes = [], viewTypes = {}, defaultScope, defaultView } = scopeData || {};

	if (!CONTROLS_CONFIG.shipment_types.some((shipment_type_obj) => shipment_type_obj.value === shipment_type)) {
		shipment_type = 'fcl_freight';
	}
	if (trade_type && !CONTROLS_CONFIG.trade_types.some((trade_type_obj) => trade_type_obj.value === trade_type)) {
		trade_type = undefined;
	}
	if (typeof page !== 'number') {
		page = 1;
	}

	const tabs = TABS_CONFIG[shipment_type];
	const { name: defaultActiveTab, isCriticalVisible } = tabs.find((tab) => tab.name === activeTab) || tabs[0];
	activeTab = defaultActiveTab;

	if (!scopes.includes(scope)) {
		scope = defaultScope;
	}
	if ((viewTypes[scope] || []).includes(view_type)) {
		view_type = defaultView;
	}

	return {
		filters: {
			shipment_type,
			...(trade_type && { trade_type }),
			...(isCriticalVisible && { isCriticalOn: !!isCriticalOn }),
			...(q && { q }),
			page,
		},
		activeTab,
		scopeFilters: {
			scope, view_type, selected_agent_id: storedValues?.scopeFilters?.selected_agent_id,
		},
	};
}
