import { subtractDays } from '@cogoport/utils';

const SUBSTRACT_ONE_DAY = 1;
const SUBSTRACT_SIX_DAY = 6;
const SUBSTRACT_THIRTEEN_DAY = 13;
const LAST_DAY = 0;
const LAST_AND_FIRST_MONTH = 1;

const date = new Date();
const startDate = date;
const endDate = date;

const getYesterday = () => {
	const newDate = subtractDays(date, SUBSTRACT_ONE_DAY);
	return { startDate: newDate, endDate: newDate };
};

const getLastSevenDays = () => {
	const newDate = subtractDays(date, SUBSTRACT_SIX_DAY);
	return { startDate: newDate, endDate: date };
};

const getLastFourteenDays = () => {
	const newDate = subtractDays(date, SUBSTRACT_THIRTEEN_DAY);
	return { startDate: newDate, endDate: date };
};

const getLastMonth = () => {
	const firstDayOfLastMonth = new Date(date.getFullYear(), date.getMonth()
				- LAST_AND_FIRST_MONTH, LAST_AND_FIRST_MONTH);
	const lastDayOfLastMonth = new Date(date.getFullYear(), date.getMonth(), LAST_DAY);
	return { startDate: firstDayOfLastMonth, endDate: lastDayOfLastMonth };
};

const getCurrentMonth = () => {
	const firstDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth(), LAST_AND_FIRST_MONTH);
	return { startDate: firstDayOfCurrentMonth, endDate: date };
};

const getToday = () => ({ startDate, endDate });

export const DATES_MAPPING = {
	yesterday     : getYesterday(),
	last_7_days   : getLastSevenDays(),
	last_14_days  : getLastFourteenDays(),
	last_month    : getLastMonth(),
	current_month : getCurrentMonth(),
	today         : getToday(),
};
