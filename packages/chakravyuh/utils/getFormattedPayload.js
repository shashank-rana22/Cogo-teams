import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import { LOCATION_KEYS } from '../constants/map_constants';

const EXCLUDE_KEYS = ['origin', 'destination', 'service_type', 'origin_type', 'destination_type',
	'is_origin_icd', 'is_destination_icd', 'page', 'chartType'];

const getFormattedPayload = (globalFilters = {}, excludeKeys = []) => {
	const keysToExclude = [...EXCLUDE_KEYS, ...excludeKeys];
	const filters = Object.fromEntries(Object.entries(globalFilters)
		.filter(([key, v]) => v && !keysToExclude.includes(key)));

	const { start_date, end_date } = globalFilters;

	filters.start_date = start_date ? start_date.toISOString().split('T')[GLOBAL_CONSTANTS.zeroth_index] : undefined;
	filters.end_date = end_date ? end_date.toISOString().split('T')[GLOBAL_CONSTANTS.zeroth_index] : undefined;
	filters.commodity = !isEmpty(filters?.commodity) ? filters.commodity : undefined;

	LOCATION_KEYS.forEach((key) => {
		if (!excludeKeys.includes(key) && globalFilters[key]) {
			filters[`${key}_${globalFilters[`${key}_type`]}_id`] = globalFilters[key];
		}
	});

	return { filters };
};

export default getFormattedPayload;
