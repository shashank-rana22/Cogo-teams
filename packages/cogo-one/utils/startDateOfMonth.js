import { format } from '@cogoport/utils';

import datesMapping from './dates-mapping';

export const startDateOfMonth = ({ date = {}, dateformat = 'yyyy-MM-dd' }) => ({
	start_date : format(date.startDate || new Date(), dateformat),
	end_date   : format(date.endDate || new Date(), dateformat),
});

export const getDefaultFilters = ({ range }) => {
	const defaultDate = datesMapping({ range });
	return startDateOfMonth({ date: defaultDate });
};
