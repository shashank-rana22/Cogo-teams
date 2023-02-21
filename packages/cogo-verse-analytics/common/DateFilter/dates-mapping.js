import { subtractDays, getYear, startOfWeek, startOfMonth, endOfWeek, addDays } from '@cogoport/utils';

const datesMapping = (range) => {
	const date = new Date();
	let startDate = date;
	let endDate = date;

	if (range === 'yesterday') {
		const new_date = subtractDays(date, 1);
		startDate = new_date;
		endDate = new_date;
	} else if (range === 'this_week') {
		const firstWeek = startOfWeek(date, { weekStartsOn: 1 });
		const lastWeek = endOfWeek(date, { weekStartsOn: 1 });

		startDate = addDays(new Date(firstWeek), 1);
		endDate = addDays(new Date(lastWeek), 1);
	} else if (range === 'last_week') {
		const newDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() - 7,
		);

		const first = newDate.getDate() - newDate.getDay() + 1;
		const last = first + 6;

		startDate = new Date(newDate.setDate(first));
		endDate = new Date(newDate.setDate(last));
	} else if (range === 'this_month') {
		const new_date = startOfMonth(date);
		startDate = new_date;
		endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	} else if (range === 'last_month') {
		startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		endDate = new Date(date.getFullYear(), date.getMonth(), 0);
	} else if (range === 'this_year') {
		const currentYear = new Date().getFullYear();

		startDate = new Date(getYear(date), 0, 1);
		endDate = new Date(currentYear, 11, 31);
	} else if (range === 'last_year') {
		const currentYear = new Date().getFullYear() - 1;

		startDate = new Date(currentYear, 0, 1);
		endDate = new Date(currentYear, 11, 31);
	}

	return { startDate, endDate };
};

export default datesMapping;
