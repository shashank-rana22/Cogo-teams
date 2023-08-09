import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { format, addDays } from '@cogoport/utils';

import { DATES_MAPPING } from './dates-mapping';

const ADD_ONE_DAY = 1;

export const startDateOfMonth = ({ date = {}, dateformat = GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'] }) => ({
	start_date : format(date.startDate || new Date(), dateformat),
	end_date   : format(addDays(date.endDate || new Date(), ADD_ONE_DAY), dateformat),
});

export const getDefaultFilters = ({ range }) => {
	const defaultDate = DATES_MAPPING[range];
	return startDateOfMonth({ date: defaultDate });
};
