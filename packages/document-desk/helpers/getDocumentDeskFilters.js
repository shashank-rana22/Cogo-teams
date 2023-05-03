import customsMapping from '../configs/FCL_TABS/CUSTOMS_TABS';
import exportMapping from '../configs/FCL_TABS/EXPORT_TABS';
import importMapping from '../configs/FCL_TABS/IMPORT_TABS';
import localMapping from '../configs/FCL_TABS/LOCAL_TABS';

const mapping = {
	fcl_customs : customsMapping,
	export      : exportMapping,
	import      : importMapping,
	fcl_local   : localMapping,
};

const keyMapping = {
	eta : 'schedule_arrival',
	etd : 'schedule_departure',
};

const getDocumentDeskFilters = ({ documentDeskContextValues, filters }) => {
	const { stepperTab = '', activeTab } = documentDeskContextValues || {};
	const { isCriticalOn, endDate, startDate, dateRange, date_type, ...restFilters } = filters || {};

	const stepperMapping = mapping[stepperTab];

	const tabFilters = stepperMapping?.TABWISE_FILTERS({ activeTab, isCriticalOn }) || {};

	let finalFilters = { ...(tabFilters || {}), ...restFilters };

	if (isCriticalOn) {
		const criticalFilters = isCriticalOn ? stepperMapping?.CRITICAL_TABS?.[activeTab] || {} : {};
		finalFilters = { ...finalFilters, ...(criticalFilters || {}) };
	}

	if (dateRange && startDate && date_type && endDate) {
		finalFilters[`${keyMapping[date_type]}_greater_than`] = startDate;
		finalFilters[`${keyMapping[date_type]}_less_than`] = endDate;
	}

	if (['import', 'export'].includes(stepperTab)) finalFilters.trade_type = stepperTab;

	return finalFilters;
};

export default getDocumentDeskFilters;
