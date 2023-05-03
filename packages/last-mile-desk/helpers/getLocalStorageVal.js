import TRADE_TYPE from '../configs/TRADE_TYPES';

const getLocalStorageVal = () => {
	const storedValues = JSON.parse(localStorage?.getItem('last_mile_desk_values'));
	const lastMileDeskVersion = localStorage.getItem('last_mile_desk_version');

	const { filters = {}, scopeFilters = {}, activeTab = 'vessel_departed' } = storedValues || {};

	const { trade_type, page } = filters || {};

	if (!TRADE_TYPE.includes(trade_type)) filters.trade_type = undefined;

	if (typeof page !== 'number') filters.page = 1;

	return { filters, activeTab, scopeFilters, lastMileDeskVersion };
};

export default getLocalStorageVal;
