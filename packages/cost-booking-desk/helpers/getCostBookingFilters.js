import CRITICAL_FILTER from '../config/CRITICAL_FILTER';
import TABWISE_FILTERS from '../config/TABWISE_FILTERS.json';

const keyMapping = {
	eta : 'schedule_arrival',
	etd : 'schedule_departure',
};

export default function getCostBookingFilters({ filters = {}, costBookingContextValues = {} }) {
	const { activeTab, stepperTab, shipmentType } = costBookingContextValues || {};

	const { criticalOn, endDate, startDate, dateRange, date_type, q, ...restFilters } = filters || {};

	let finalFilters = { ...(TABWISE_FILTERS[activeTab] || {}), ...restFilters };

	if (['import', 'export'].includes(stepperTab)) {
		finalFilters.trade_type = stepperTab;
	}

	if (q) { finalFilters.q = q; }

	if (criticalOn) {
		finalFilters = { ...finalFilters, ...(CRITICAL_FILTER[shipmentType]?.[stepperTab]?.[activeTab] || {}) };
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
}
