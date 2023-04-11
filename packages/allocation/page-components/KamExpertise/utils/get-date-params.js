import { getMonth, getYear, getDate, startOfWeek, startOfMonth } from '@cogoport/utils';

function getDateParams() {
	const currentTime = new Date();

	const month = getMonth(currentTime);

	const day = getDate(currentTime);

	const year = getYear(currentTime);

	const weekEnd = startOfWeek(new Date(year, month, day));

	const monthEnd = startOfMonth(new Date(year, month, day));

	const quarter = Math.floor(((month + 1) / 3));
	const startFullQuarter = new Date(year, quarter * 3 - 3, 1);

	const yearEnd = new Date(year, 0, 1);

	return {
		weekEnd,
		monthEnd,
		startFullQuarter,
		yearEnd,
		currentTime,
	};
}

export default getDateParams;
