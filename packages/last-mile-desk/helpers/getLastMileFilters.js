import { CRITICAL_TABS, TABWISE_FILTERS } from '../configs/FCL_TABS';

const keyMapping = {
	eta : 'schedule_arrival',
	etd : 'schedule_departure',
};

const getLastMileFilters = ({ filters = {}, lastMileContextValues }) => {
	const { activeTab } = lastMileContextValues || {};
	const { criticalOn, endDate, startDate, dateRange, date_type, ...restFilters } = filters || {};

	let finalFilters = { ...(TABWISE_FILTERS[activeTab] || {}), ...restFilters };

	if (criticalOn) {
		finalFilters = { ...finalFilters, ...(CRITICAL_TABS[activeTab] || {}) };
	}

	if (dateRange && startDate && date_type && endDate) {
		finalFilters[`${keyMapping[date_type]}_greater_than`] = startDate;
		finalFilters[`${keyMapping[date_type]}_less_than`] = endDate;
	}

	return finalFilters;
};
export default getLastMileFilters;
