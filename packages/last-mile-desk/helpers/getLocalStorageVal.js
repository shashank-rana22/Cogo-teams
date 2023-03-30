import TRADE_TYPE from '../configs/TRADE_TYPES';

const getLocalStorageVal = (scopeData) => {
	const storedValues = JSON.parse(localStorage?.getItem('last_mile_desk_values'));

	const filters = storedValues?.filters || {};
	const scopeFilters = storedValues?.scopeFilters || {};
	const activeTab = storedValues?.activeTab || 'vessel_departed';

	const { trade_type, page } = filters || {};
	const { scope, view_type } = scopeFilters || {};
	const { scopes = [], viewTypes = {} } = scopeData || {};

	if (!TRADE_TYPE.includes(trade_type)) filters.trade_type = undefined;

	if (typeof page !== 'number') filters.page = 1;

	if ((scopes || []).includes(scope)) scopeFilters.scope = scope;

	if ((viewTypes[scopeFilters.scope] || []).includes(view_type)) scopeFilters.view_type = view_type;

	return { filters, activeTab, scopeFilters };
};

export default getLocalStorageVal;
