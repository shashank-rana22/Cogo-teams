import { subtractDays } from '@cogoport/utils';

import { LOCATION_KEYS } from '../constants/map_constants';

const getFormattedPayload = (filters) => {
	const {
		origin, destination,
		origin_type, destination_type, is_origin_icd, date_diff, is_destination_icd, ...params
	} = filters;

	const endDate = new Date();
	params.startDate = subtractDays(endDate, date_diff);

	LOCATION_KEYS.forEach((key) => {
		if (filters[key]) {
			params[`${key}_${filters[`${key}_type`]}_id`] = filters[key];
		}
	});
	return { params };
};

export default getFormattedPayload;
