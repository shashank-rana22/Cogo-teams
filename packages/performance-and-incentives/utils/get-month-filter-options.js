import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const OFFSET = 1;

const getMonthFilterOptions = () => {
	const startDate = new Date('2023-09-01');
	const currentDate = new Date();

	const MONTHS_IN_RANGE = [];

	while (startDate <= currentDate) {
		const monthName = GLOBAL_CONSTANTS.months[startDate.getMonth()];
		const year = startDate.getFullYear();
		MONTHS_IN_RANGE.push({
			label : `${monthName} ${year}`,
			value : `${startDate.getMonth()}-${year}`,
		});

		startDate.setMonth(startDate.getMonth() + OFFSET);
	}

	return MONTHS_IN_RANGE;
};

export default getMonthFilterOptions;
