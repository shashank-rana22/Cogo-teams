import { getYear, getMonth } from '@cogoport/utils';

import monthOptions from '../constants/month-options';

const getMonthYearOptions = (year) => {
	const currentDate = new Date();
	const currentMonth = getMonth(currentDate);
	const currentYear = getYear(currentDate);

	const yearOptions = [
		{ label: `${currentYear}`, value: currentYear },
		{ label: `${currentYear - 1}`, value: currentYear - 1 },
		{ label: `${currentYear - 2}`, value: currentYear - 2 },
	];

	let newMonthOptions = monthOptions;

	if (year === currentYear) {
		newMonthOptions = newMonthOptions.filter((m) => m.index <= currentMonth);
	}

	return { yearOptions, monthOptions: newMonthOptions };
};

export default getMonthYearOptions;
