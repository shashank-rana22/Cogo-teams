import { subtractDays, addDays } from '@cogoport/utils';

const DATE = new Date();

const DATE_RANGE_MAPPING = {
	last_3_days: {
		startDate : subtractDays(DATE, 3),
		endDate   : subtractDays(DATE, 1),
	},
	today: {
		startDate : DATE,
		endDate   : DATE,
	},
	next_3_days: {
		startDate : addDays(DATE, 1),
		endDate   : addDays(DATE, 3),
	},
	next_7_days: {
		startDate : addDays(DATE, 1),
		endDate   : addDays(DATE, 7),
	},
	next_14_days: {
		startDate : addDays(DATE, 1),
		endDate   : addDays(DATE, 14),
	},
	next_30_days: {
		startDate : addDays(DATE, 1),
		endDate   : addDays(DATE, 30),
	},
};

export default DATE_RANGE_MAPPING;
