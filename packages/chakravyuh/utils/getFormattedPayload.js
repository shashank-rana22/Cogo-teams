import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import { LOCATION_KEYS } from '../constants/map_constants';

const EXCLUDE_KEYS = ['origin', 'destination', 'service_type', 'origin_type', 'destination_type',
	'is_origin_icd', 'is_destination_icd', 'page', 'weight_slab_in_kg'];

const getFormattedPayload = (globalFilters = {}, excludeKeys = []) => {
	const { service_type } = globalFilters;
	const key_to_remove = service_type === 'fcl' ? 'source' : 'parent_mode';
	const keysToExclude = [...EXCLUDE_KEYS, ...excludeKeys, key_to_remove];
	const filters = Object.fromEntries(Object.entries(globalFilters)
		.filter(([key, v]) => v && !keysToExclude.includes(key)));

	const { start_date, end_date, weight_slab_in_kg } = globalFilters;

	filters.start_date = start_date ? formatDate({
		date       : start_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	}) : undefined;
	filters.end_date = end_date ? formatDate({
		date       : end_date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	}) : undefined;
	filters.commodity = !isEmpty(filters?.commodity) ? filters.commodity : undefined;

	if (filters.chart_type === 'trend') {
		filters.chart_type = undefined;
	}

	if (weight_slab_in_kg) {
		const [lower_limit, upper_limit] = weight_slab_in_kg.split('_');
		filters.lower_limit = lower_limit;
		filters.upper_limit = upper_limit;
	}

	LOCATION_KEYS.forEach((key) => {
		if (!excludeKeys.includes(key) && globalFilters[key]) {
			filters[`${key}_${globalFilters[`${key}_type`]}_id`] = globalFilters[key];
		}
	});

	return { filters };
};

export default getFormattedPayload;
