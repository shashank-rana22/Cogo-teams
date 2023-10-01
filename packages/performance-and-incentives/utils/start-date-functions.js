const OFFSET = 1;
const START_DATE = 1;
const APRIL = 3;
const JULY = 6;
const AUGUST = 7;
const NOVEMBER = 10;
const DECEMBER = 11;
const MARCH = 2;
const ADD_MONTH = 1;
const ZERO = 0;
const TOTAL_HOURS = 24;

export const getTodayStartDate = () => {
	const currentDate = new Date();
	currentDate.setHours(ZERO, ZERO, ZERO, ZERO);
	return currentDate;
};

export const getThisMonthStartDate = () => {
	const currentDate = new Date();
	currentDate.setDate(START_DATE);
	currentDate.setHours(ZERO, ZERO, ZERO, ZERO);
	return currentDate;
};

export const getLastMonthFirstAndLastDates = () => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	const startDate = new Date(currentYear, currentMonth - OFFSET, START_DATE);

	const endDate = new Date(currentYear, currentMonth, ZERO);
	endDate.setHours(TOTAL_HOURS, ZERO, ZERO, -OFFSET);

	return {
		startDate,
		endDate,
	};
};

export const getThisMonthLastDate = () => {
	const currentDate = new Date();

	return new Date(currentDate.getFullYear(), currentDate.getMonth() + ADD_MONTH, ZERO);
};

export const getThisQuarterStartDate = () => {
	const currentDate = new Date();

	currentDate.setDate(START_DATE);
	currentDate.setHours(ZERO, ZERO, ZERO, ZERO);

	const currentMonth = currentDate.getMonth();

	if (currentMonth >= APRIL && currentMonth <= JULY) {
		currentDate.setMonth(APRIL);
	} else if (currentMonth >= AUGUST && currentMonth <= NOVEMBER) {
		currentDate.setMonth(AUGUST);
	} else {
		if (currentMonth <= MARCH) {
			currentDate.setFullYear(currentDate.getFullYear - OFFSET);
		}
		currentDate.setMonth(DECEMBER);
	}

	return currentDate;
};

export const getThisAseessYearStartDate = () => {
	const currentDate = new Date();
	currentDate.setHours(ZERO, ZERO, ZERO, ZERO);

	if (currentDate.getMonth() < APRIL) {
		currentDate.setFullYear(currentDate.getFullYear() - OFFSET);
	}
	currentDate.setDate(START_DATE);
	currentDate.setMonth(APRIL);

	return currentDate;
};
