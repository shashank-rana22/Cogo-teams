import { format, addDays } from '@cogoport/utils';

import datesMapping from '../common/FilterContentComponents/dates-mapping';

export const startDateOfMonth = (date = {}, dateformat = 'yyyy-MM-dd') => ({
	start_date : format(date.startDate || new Date(), dateformat),
	end_date   : format(
		addDays(date.endDate || new Date(), 1),
		dateformat,
	),
});

export const getDefaultFilters = (range, isShipment = false) => {
	const defaultDate = datesMapping(range);
	return startDateOfMonth(
		defaultDate,
		isShipment ? 'yyyy-MM-dd:mm:ss.sssz' : 'yyyy-MM-dd',
	);
};
