import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { subtractDays } from '@cogoport/utils';

import { LOCATION_KEYS } from '../constants/map_constants';

const EXCLUDE_KEYS = ['origin', 'destination', 'service_type', 'origin_type', 'destination_type',
	'is_origin_icd', 'date_diff', 'is_destination_icd', 'end_date'];

const getFormattedPayload = (globalFilters = {}, excludeKeys = []) => {
	const keysToExclude = [...EXCLUDE_KEYS, ...excludeKeys];
	const filters = Object.fromEntries(Object.entries(globalFilters)
		.filter(([key, v]) => v && !keysToExclude.includes(key)));

	const { end_date, date_diff } = globalFilters;

	if (end_date) {
		filters.start_date = subtractDays(end_date, date_diff).toISOString().split('T')[GLOBAL_CONSTANTS.zeroth_index];
		filters.end_date = end_date.toISOString().split('T')[GLOBAL_CONSTANTS.zeroth_index];
	}

	LOCATION_KEYS.forEach((key) => {
		if (!excludeKeys.includes(key) && globalFilters[key]) {
			filters[`${key}_${globalFilters[`${key}_type`]}_id`] = globalFilters[key];
		}
	});

	return { filters };
};

export default getFormattedPayload;
