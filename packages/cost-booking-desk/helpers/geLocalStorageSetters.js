export default function getLocalStorageSetters({ scopeData }) {
	const storedValues = JSON.parse(localStorage?.getItem('cost_booking_desk_values'));
	const filters = storedValues?.filters || {};
	const activeTab = storedValues?.activeTab || 'assigned';

	let { scope, view_type } = storedValues?.scopeFilters || {};
	const { trade_type, dateFilters } = filters;
	const { scopes = [], viewTypes = {}, defaultScope, defaultView } = scopeData || {};

	if (!['export', 'import'].includes(trade_type)) filters.trade_type = 'export';

	if (typeof dateFilters !== 'object') filters.dateFilters = {};

	if (typeof page !== 'number') filters.page = 1;

	if (!scopes.includes(scope)) {
		scope = defaultScope;
	}

	if (!(viewTypes[scope] || []).includes(view_type)) {
		view_type = defaultView;
	}

	return {
		filters,
		activeTab,
		scopeFilters: {
			scope, view_type, selected_agent_id: storedValues?.scopeFilters?.selected_agent_id,
		},
	};
}
