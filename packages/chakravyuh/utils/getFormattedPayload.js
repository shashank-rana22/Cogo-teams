import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { LOCATION_KEYS } from '../constants/map_constants';

const EXCLUDE_KEYS = ['origin', 'destination', 'service_type', 'origin_type', 'destination_type',
	'is_origin_icd', 'is_destination_icd', 'parent_mode', 'startDate', 'endDate', 'page'];

const getFormattedPayload = (globalFilters = {}, excludeKeys = []) => {
	const keysToExclude = [...EXCLUDE_KEYS, ...excludeKeys];
	const filters = Object.fromEntries(Object.entries(globalFilters)
		.filter(([key, v]) => v && !keysToExclude.includes(key)));

	const { startDate, endDate } = globalFilters;

	filters.start_date = startDate ? startDate.toISOString().split('T')[GLOBAL_CONSTANTS.zeroth_index] : undefined;
	filters.end_date = endDate ? endDate.toISOString().split('T')[GLOBAL_CONSTANTS.zeroth_index] : undefined;

	LOCATION_KEYS.forEach((key) => {
		if (!excludeKeys.includes(key) && globalFilters[key]) {
			filters[`${key}_${globalFilters[`${key}_type`]}_id`] = globalFilters[key];
		}
	});

	return { filters };
};

export default getFormattedPayload;
