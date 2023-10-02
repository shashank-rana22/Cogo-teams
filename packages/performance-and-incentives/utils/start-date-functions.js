const OFFSET = 1;
const START_DATE = 1;
const JANUARY = 0;
const MARCH = 2;
const APRIL = 3;
const JUNE = 5;
const JULY = 6;
const SEPTEMBER = 8;
const OCTOBER = 9;
const ADD_MONTH = 1;
const ZERO = 0;
const MONTHS = 12;
const MONTHS_IN_QUARTER = 3;
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

export const getLastMonthStartAndEndDates = () => {
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

export const getLastQuarterStartAndEndDates = () => {
	const currentDate = new Date();

	const currentMonth = currentDate.getMonth();

	const lastQuarterStartMonth = (currentMonth - MONTHS_IN_QUARTER + MONTHS) % MONTHS;
	const lastQuarterEndMonth = (currentMonth - OFFSET + MONTHS) % MONTHS;

	const lastQuarterStartDate = new Date(
		currentDate.getFullYear(),
		lastQuarterStartMonth,
		OFFSET,
		ZERO,
		ZERO,
		ZERO,
		ZERO,
	);
	const lastQuarterEndDate = new Date(
		currentDate.getFullYear(),
		lastQuarterEndMonth + OFFSET,
		ZERO,
		TOTAL_HOURS,
		ZERO,
		ZERO,
		-OFFSET,
	);

	return {
		startDate : lastQuarterStartDate.toISOString(),
		endDate   : lastQuarterEndDate.toISOString(),
	};
};

export const getThisQuarterStartDate = () => {
	const currentDate = new Date();
	currentDate.setHours(ZERO, ZERO, ZERO, ZERO);

	const currentMonth = currentDate.getMonth();

	if (currentMonth >= JANUARY && currentMonth <= MARCH) {
		currentDate.setMonth(JANUARY);
	} else if (currentMonth >= APRIL && currentMonth <= JUNE) {
		currentDate.setMonth(APRIL);
	} else if (currentMonth >= JULY && currentMonth <= SEPTEMBER) {
		currentDate.setMonth(JULY);
	} else {
		currentDate.setMonth(OCTOBER);
	}
	currentDate.setDate(START_DATE);

	return currentDate;
};

export const getThisAseessYearStartDate = () => {
	const currentDate = new Date();
	currentDate.setHours(ZERO, ZERO, ZERO, ZERO);

	currentDate.setMonth(JANUARY);
	currentDate.setDate(START_DATE);

	return currentDate;
};
