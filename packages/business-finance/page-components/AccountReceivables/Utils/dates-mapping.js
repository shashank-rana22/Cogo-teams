import { endOfWeek, startOfWeek, startOfMonth, addDays, subtractDays, getYear } from '@cogoport/utils';

const DATE_FACTOR = 1;
const MONTH_FACTOR = 0;
const HOUR_FACTOR = 0;
const TOTAL_MONTH_COUNT = 11;
const TOTAL_DATE_COUNT = 31;
const WEEK_FOCTOR = 7;
const LAST_WEEK_FOCTOR = 6;
const getDateMapping = (range = '') => {
	const date = new Date();
	let startDate = date;
	let endDate = date;

	if (range === 'yesterday') {
		const new_date = subtractDays(date, DATE_FACTOR);
		startDate = new_date;
		endDate = new_date;
	} else if (range === 'this_week') {
		const firstWeek = startOfWeek(date, { weekStartsOn: 1 });
		const lastWeek = endOfWeek(date, { weekStartsOn: 1 });

		startDate = addDays(new Date(firstWeek), DATE_FACTOR);
		endDate = addDays(new Date(lastWeek), DATE_FACTOR);
	} else if (range === 'last_week') {
		const newDate = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate() - WEEK_FOCTOR,
		);

		const first = newDate.getDate() - newDate.getDay() + DATE_FACTOR;
		const last = first + LAST_WEEK_FOCTOR;

		startDate = new Date(newDate.setDate(first));
		endDate = new Date(newDate.setDate(last));
	} else if (range === 'this_month') {
		const new_date = startOfMonth(date);
		startDate = new_date;
		endDate = new Date(date.getFullYear(), date.getMonth() + DATE_FACTOR, HOUR_FACTOR);
	} else if (range === 'last_month') {
		startDate = new Date(date.getFullYear(), date.getMonth() - DATE_FACTOR, DATE_FACTOR);
		endDate = new Date(date.getFullYear(), date.getMonth(), DATE_FACTOR);
	} else if (range === 'this_year') {
		const currentYear = new Date().getFullYear();

		startDate = new Date(getYear(date), MONTH_FACTOR, DATE_FACTOR);
		endDate = new Date(currentYear, TOTAL_MONTH_COUNT, TOTAL_DATE_COUNT);
	} else if (range === 'last_year') {
		const currentYear = new Date().getFullYear() - DATE_FACTOR;

		startDate = new Date(currentYear, MONTH_FACTOR, DATE_FACTOR);
		endDate = new Date(currentYear, TOTAL_MONTH_COUNT, TOTAL_DATE_COUNT);
	}

	return { startDate, endDate };
};

export default getDateMapping;
