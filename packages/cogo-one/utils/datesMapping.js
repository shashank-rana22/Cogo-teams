import { subtractDays } from '@cogoport/utils';

const SUBSTRACT_ONE_DAY = 1;
const SUBSTRACT_SIX_DAY = 6;
const SUBSTRACT_THIRTEEN_DAY = 13;
const LAST_DAY = 0;
const LAST_AND_FIRST_MONTH = 1;

export const DATES_MAPPING = {
	yesterday: (date) => ({
		startDate : subtractDays(date, SUBSTRACT_ONE_DAY),
		endDate   : subtractDays(date, SUBSTRACT_ONE_DAY),
	}),
	last_7_days  : (date) => ({ startDate: subtractDays(date, SUBSTRACT_SIX_DAY), endDate: date }),
	last_14_days : (date) => ({ startDate: subtractDays(date, SUBSTRACT_THIRTEEN_DAY), endDate: date }),
	last_month   : (date) => ({
		startDate: new Date(date.getFullYear(), date.getMonth()
			- LAST_AND_FIRST_MONTH, LAST_AND_FIRST_MONTH),
		endDate: new Date(date.getFullYear(), date.getMonth(), LAST_DAY),
	}),
	current_month: (date) => ({
		startDate: new Date(
			date.getFullYear(),
			date.getMonth(),
			LAST_AND_FIRST_MONTH,
		),
		endDate: date,
	}),
	today  : (date) => ({ startDate: date, endDate: date }),
	custom : (date) => ({ startDate: date, endDate: date }),
};
