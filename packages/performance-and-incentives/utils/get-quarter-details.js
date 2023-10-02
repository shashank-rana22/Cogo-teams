import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const OFFSET = 1;
const QUARTER_START = 0;
const QUARTER_END = 2;
const MONTHS_IN_QUARTER = 3;

const quarterMonths = GLOBAL_CONSTANTS.months.reduce((result, month, index) => {
	if (index % MONTHS_IN_QUARTER === QUARTER_START) {
		result.startMonths.push(month);
	}
	if (index % MONTHS_IN_QUARTER === QUARTER_END) {
		result.endMonths.push(month);
	}
	return result;
}, { startMonths: [], endMonths: [] });

const getCurrentQuarter = () => {
	const currentDate = new Date();

	const currentMonth = currentDate.getMonth();

	const currentQuarter = Math.floor(currentMonth / MONTHS_IN_QUARTER) + OFFSET;

	const quarterStartMonth = quarterMonths.startMonths[currentQuarter - OFFSET];
	const quarterEndMonth = quarterMonths.endMonths[currentQuarter - OFFSET];

	return { quarterStartMonth, quarterEndMonth };
};

const getLastQuarter = () => {
	const currentDate = new Date();

	const currentMonth = currentDate.getMonth();

	const lastQuarter = Math.floor(currentMonth / MONTHS_IN_QUARTER);

	const lastQuarterStartMonth = quarterMonths.startMonths[lastQuarter - OFFSET];
	const lastQuarterEndMonth = quarterMonths.endMonths[lastQuarter - OFFSET];

	return { lastQuarterStartMonth, lastQuarterEndMonth };
};

export { getCurrentQuarter, getLastQuarter };
