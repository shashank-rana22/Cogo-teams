import CONTROLS_CONFIG from '../config/CONTROLS_CONFIG.json';
import TABS from '../config/TABS_CONFIG';

export default function getLocalStorageVal() {
	const storedValues = JSON.parse(localStorage?.getItem('cost_booking_desk_values'));
	const costBookingDeskVersion = localStorage.getItem('last_mile_desk_version');

	const { scopeFilters = {}, filters = {} } = storedValues || {};
	let { shipmentType, stepperTab, activeTab } = storedValues || {};

	// const filters = storedValues?.filters || {};
	// const activeTab = storedValues?.activeTab || 'assigned';

	// let { scope, view_type } = storedValues?.scopeFilters || {};
	// const { trade_type, dateFilters } = filters;
	// const { scopes = [], viewTypes = {}, defaultScope, defaultView } = scopeData || {};

	// if (!['export', 'import'].includes(trade_type)) filters.trade_type = 'export';

	// if (typeof dateFilters !== 'object') filters.dateFilters = {};

	// if (typeof page !== 'number') filters.page = 1;

	// if (!scopes.includes(scope)) {
	// 	scope = defaultScope;
	// }

	// if (!(viewTypes[scope] || []).includes(view_type)) {
	// 	view_type = defaultView;
	// }

	// return {
	// 	filters,
	// 	activeTab,
	// 	scopeFilters: {
	// 		scope, view_type, selected_agent_id: storedValues?.scopeFilters?.selected_agent_id,
	// 	},
	// };

	if (!CONTROLS_CONFIG.shipment_types.some((t) => t.value === shipmentType)) {
		shipmentType = 'fcl_freight';
		stepperTab = 'export';
		activeTab = 'assigned';
		filters.page = 1;
	}

	if (!Object.keys(TABS[shipmentType])?.includes(stepperTab)) {
		stepperTab = Object.keys(TABS[shipmentType])?.[0] || '';
		const tabConfig = TABS[shipmentType]?.[stepperTab]?.[0];

		activeTab = tabConfig?.value || '';
		filters.criticalOn = filters.criticalOn && tabConfig?.isCriticalVisible;
	}

	if (typeof filters?.page !== 'number') filters.page = 1;

	return {
		filters, shipmentType, stepperTab, scopeFilters, costBookingDeskVersion, activeTab,
	};
}
