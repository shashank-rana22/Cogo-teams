import tabPayload, { CRITICAL_TABS } from '../config/SHIPMENTS_PAYLOAD';

import getAdditionalMethods from './getAdditionalMethods';

const keyMapping = {
	eta : 'schedule_arrival',
	etd : 'schedule_departure',
};

export default function getKamDeskFilters({ filters, kamDeskContextValues }) {
	const { activeTab, shipmentType, stepperTab } = kamDeskContextValues || {};
	const { criticalOn, date_type, dateRange, startDate, endDate, ...restFilters } = filters || {};

	const tabwiseFilters = shipmentType === 'all' ? tabPayload.all?.[activeTab]
		: tabPayload?.[shipmentType]?.[stepperTab]?.[activeTab];

	let finalFilters = { ...tabwiseFilters, ...restFilters };

	if (criticalOn) {
		finalFilters = { ...finalFilters, ...(CRITICAL_TABS?.[shipmentType]?.[stepperTab]?.[activeTab] || {}) };
	}

	if (dateRange && startDate && date_type && endDate) {
		finalFilters[`${keyMapping[date_type]}_greater_than`] = startDate;
		finalFilters[`${keyMapping[date_type]}_less_than`] = endDate;
	}

	if (['import', 'export'].includes(stepperTab)) {
		finalFilters.trade_type = stepperTab;
	}

	return {
		filters            : finalFilters,
		additional_methods : getAdditionalMethods({ shipmentType, stepperTab, activeTab }),
	};
}
