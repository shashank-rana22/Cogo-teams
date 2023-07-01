import { format, addDays } from '@cogoport/utils';

const getNextWeekDate = (item, showOtherFormat = false) => {
	const { day, month, year } = item;
	const firstDay = new Date(`${year}/${month}/${day}`);
	if (showOtherFormat) {
		const nextWeek = addDays(firstDay, 13);
		return nextWeek;
	}
	return format(firstDay, 'dd MMM yy');
};

export default getNextWeekDate;
