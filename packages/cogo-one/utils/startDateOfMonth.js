import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { addDays } from '@cogoport/utils';

import { DATES_MAPPING } from './datesMapping';

const ADD_ONE_DAY = 1;

export const startDateOfMonth = ({ date = {} }) => ({
	start_date: formatDate({
		date       : date.startDate || new Date(),
		formatType : 'date',
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	}),
	end_date: formatDate({
		date       : addDays(date.endDate || new Date(), ADD_ONE_DAY),
		formatType : 'date',
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	}),
});

export const getDefaultFilters = ({ range }) => {
	const defaultDate = DATES_MAPPING[range]?.(new Date());
	return startDateOfMonth({ date: defaultDate });
};
