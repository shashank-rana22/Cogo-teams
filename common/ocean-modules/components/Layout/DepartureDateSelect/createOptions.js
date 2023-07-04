import { addDays, format } from '@cogoport/utils';

const WEEK_DATE_INCR = 6;
const FIRST_START_DATE_INCR = 1;
const DEFAULT_FIRST_START_DATE_INCR = 0;
const DAYS_IN_WEEK = 7;
const DAYS_IN_TWO_MONTH = 60;

const createOptions = (datePair) => {
	const newStartDate = datePair?.startDate ? new Date(datePair.startDate) : new Date();

	const newEndDate = datePair?.endDate ? new Date(datePair.endDate) : addDays(new Date(), DAYS_IN_TWO_MONTH);

	const WEEKS = [];

	let weekDate = addDays(newStartDate, WEEK_DATE_INCR);
	let firstStartDate = newStartDate;

	if (weekDate > newEndDate) {
		const DATES_FOR_THIS_WEEK = [];
		let i = DEFAULT_FIRST_START_DATE_INCR;

		while (firstStartDate <= newEndDate) {
			DATES_FOR_THIS_WEEK.push({
				children: `${format((firstStartDate), 'PP')} ${format(
					(firstStartDate),
					'EEE',
				)}`,
				key: (firstStartDate),
			});

			i += FIRST_START_DATE_INCR;

			firstStartDate = addDays(firstStartDate, i);
		}

		WEEKS.push(DATES_FOR_THIS_WEEK);

		return WEEKS;
	}

	while (weekDate <= newEndDate) {
		let datesForThisWeek = [];
		let date = firstStartDate;

		datesForThisWeek.push({
			children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
			key      : (date),
		});

		for (let i = 1; i < DAYS_IN_WEEK && date <= newEndDate; i += FIRST_START_DATE_INCR) {
			date = addDays(firstStartDate, i);

			datesForThisWeek.push({
				children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
				key      : (date),
			});
		}

		firstStartDate = addDays(weekDate, FIRST_START_DATE_INCR);

		WEEKS.push(datesForThisWeek);

		weekDate = addDays(firstStartDate, WEEK_DATE_INCR);

		if (weekDate > newEndDate) {
			datesForThisWeek = [];

			date = firstStartDate;

			datesForThisWeek.push({
				children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
				key      : (date),
			});

			for (let i = 1; i < DAYS_IN_WEEK && date < newEndDate; i += FIRST_START_DATE_INCR) {
				date = addDays(firstStartDate, i);

				datesForThisWeek.push({
					children : `${format((date), 'PP')} ${format((date), 'EEE')}`,
					key      : (date),
				});
			}

			WEEKS.push(datesForThisWeek);
		}
	}

	return WEEKS;
};

export default createOptions;
