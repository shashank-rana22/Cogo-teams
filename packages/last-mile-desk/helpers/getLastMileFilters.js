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
		const start = new Date(startDate);
		start.setHours(start.getHours() + 5, 30, 0, 0);

		const end = new Date(endDate);
		end.setHours(end.getHours() + 5, 30, 0, 0);

		finalFilters[`${keyMapping[date_type]}_greater_than`] = start;
		finalFilters[`${keyMapping[date_type]}_less_than`] = end;
	}

	return finalFilters;
};
export default getLastMileFilters;
