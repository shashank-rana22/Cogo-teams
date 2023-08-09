import { format, addDays } from '@cogoport/utils';

import datesMapping from './dates-mapping';

const ADD_ONE_DAY = 1;

export const startDateOfMonth = ({ date = {}, dateformat = 'yyyy-MM-dd' }) => ({
	start_date : format(date.startDate || new Date(), dateformat),
	end_date   : format(addDays(date.endDate || new Date(), ADD_ONE_DAY), dateformat),
});

export const getDefaultFilters = ({ range }) => {
	const defaultDate = datesMapping({ range });
	return startDateOfMonth({ date: defaultDate });
};
