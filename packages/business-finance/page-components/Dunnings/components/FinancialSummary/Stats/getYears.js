const MONTH_DIVISION = 3;
const DECREMENT = 1;
const START_MONTH_INDEX = 3;
const START_DAY_INDEX = 1;
const END_MONTH_INDEX = 2;
const END_DAY_INDEX = 31;
const YEAR_END_INCREMENT = 2;
const PREV_YEAR_LIMIT = 5;

const today = new Date();
const currentYear = new Date().getFullYear();

function getFinancialYear(date) {
	const year = date.getFullYear();
	const month = date.getMonth();
	if (month < MONTH_DIVISION) {
		return year - DECREMENT;
	} return year;
}

export const FINANCIAL_YEARS = Array(PREV_YEAR_LIMIT).fill(null);
FINANCIAL_YEARS.forEach((item, index) => {
	const yearStart = new Date(today.getFullYear() - index, START_MONTH_INDEX, START_DAY_INDEX);
	const yearEnd = new Date(today.getFullYear() - index + YEAR_END_INCREMENT, END_MONTH_INDEX, END_DAY_INDEX);
	const financialYear = `${getFinancialYear(yearStart)}-${getFinancialYear(yearEnd)}`;
	FINANCIAL_YEARS[index] = financialYear;
});

export const CALENDER_YEAR = Array(PREV_YEAR_LIMIT).fill(null);
CALENDER_YEAR.forEach((item, index) => {
	const year = `${currentYear - index}`;
	CALENDER_YEAR[index] = year;
});
