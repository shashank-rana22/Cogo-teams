import { subtractDays } from '@cogoport/utils';

import { LOCATION_KEYS } from '../constants/map_constants';

const getFormattedPayload = (globalFilters) => {
	const {
		origin, destination,
		origin_type, destination_type, is_origin_icd, date_diff, is_destination_icd, ...filters
	} = globalFilters;

	const endDate = new Date();
	filters.startDate = subtractDays(endDate, date_diff);

	LOCATION_KEYS.forEach((key) => {
		if (globalFilters[key]) {
			filters[`${key}_${globalFilters[`${key}_type`]}_id`] = globalFilters[key];
		}
	});
	return { filters };
};

export default getFormattedPayload;
