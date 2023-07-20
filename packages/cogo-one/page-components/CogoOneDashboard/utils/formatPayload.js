import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import formatDateTime from './timezone-specific-utc-time';

const FIRST_DAY_OF_MONTH = 1;
const WEEK_NUMBER = 6;
const HOURS = 23;
const SECOND = 59;
const MILLI_SECOND = 999;
const WEEK_END_DATE = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + WEEK_NUMBER));
const MONTH_START_DATE = new Date(
	new Date().getUTCFullYear(),
	new Date().getUTCMonth(),
	FIRST_DAY_OF_MONTH,
	GLOBAL_CONSTANTS.zeroth_index,
	GLOBAL_CONSTANTS.zeroth_index,
	GLOBAL_CONSTANTS.zeroth_index,
	GLOBAL_CONSTANTS.zeroth_index,
);
const MONTH_END_DATE = new Date(
	new Date().getUTCFullYear(),
	new Date().getUTCMonth() + FIRST_DAY_OF_MONTH,
	GLOBAL_CONSTANTS.zeroth_index,
	HOURS,
	SECOND,
	SECOND,
	MILLI_SECOND,
);

const DATE_MAPPING = {
	day: {
		startDate : formatDateTime({ date: new Date(), dateformat: 'isoUtcDateTime' }),
		endDate   : formatDateTime({ date: new Date(), dateformat: 'isoUtcDateTime' }),
	},
	week: {
		startDate : formatDateTime({ date: new Date(), dateformat: 'isoUtcDateTime' }),
		endDate   : formatDateTime({ date: WEEK_END_DATE, dateformat: 'isoUtcDateTime' }),
	},
	month: {
		startDate : formatDateTime({ date: MONTH_START_DATE, dateformat: 'isoUtcDateTime' }),
		endDate   : formatDateTime({ date: MONTH_END_DATE, dateformat: 'isoUtcDateTime' }),
	},
};

export default DATE_MAPPING;
