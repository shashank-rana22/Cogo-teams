const OFFSET = 1;
const START_DATE = 1;
const APRIL = 3;
const JULY = 6;
const AUGUST = 7;
const NOVEMBER = 10;
const DECEMBER = 11;
const MARCH = 2;

export const getThisMonthStartDate = () => {
	const currentDate = new Date();
	currentDate.setDate(START_DATE);
	return currentDate;
};

export const getThisQuarterStartDate = () => {
	const currentDate = new Date();

	currentDate.setDate(START_DATE);

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
	if (currentDate.getMonth() < APRIL) {
		currentDate.setFullYear(currentDate.getFullYear() - OFFSET);
	}
	currentDate.setDate(START_DATE);
	currentDate.setMonth(APRIL);

	return currentDate;
};
