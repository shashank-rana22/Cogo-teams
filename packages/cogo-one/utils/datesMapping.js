import { subtractDays } from '@cogoport/utils';

const SUBSTRACT_ONE_DAY = 1;
const SUBSTRACT_SIX_DAY = 6;
const SUBSTRACT_THIRTEEN_DAY = 13;
const LAST_DAY = 0;
const LAST_AND_FIRST_MONTH = 1;

export const DATES_MAPPING = {
	yesterday: (date) => {
		const newDate = subtractDays(date, SUBSTRACT_ONE_DAY);
		return { startDate: newDate, endDate: newDate };
	},
	last_7_days: (date) => {
		const newDate = subtractDays(date, SUBSTRACT_SIX_DAY);
		return { startDate: newDate, endDate: date };
	},
	last_14_days: (date) => {
		const newDate = subtractDays(date, SUBSTRACT_THIRTEEN_DAY);
		return { startDate: newDate, endDate: date };
	},
	last_month: (date) => {
		const firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth()
				- LAST_AND_FIRST_MONTH, LAST_AND_FIRST_MONTH);
		const lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), LAST_DAY);
		return { startDate: firstDayOfLastMonth, endDate: lastDayOfLastMonth };
	},
	current_month: (date) => {
		const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), LAST_AND_FIRST_MONTH);
		return { startDate: firstDayOfCurrentMonth, endDate: date };
	},
	today  : (date) => ({ startDate: date, endDate: date }),
	custom : (date) => ({ startDate: date, endDate: date }),
};
