import { hi, en, en_uk } from '../configurations';

const getCalenderi18n = (lg, country) => {
	const months = {
		hi_IN: hi.months,
		en_IN: en.months,
		en_GB: en_uk.months,
	};

	const weekdaysShort = {
		hi_IN: hi.weekdaysShort,
		en_IN: en.weekdaysShort,
		en_GB: en_uk.weekdaysShort,
	};
	const weekdays = {
		hi_IN: hi.weekdays,
		en_IN: en.weekdays,
		en_GB: en_uk.weekdays,
	};

	const previousMonth = {
		hi_IN: hi.previousMonth,
		en_IN: en.previousMonth,
		en_GB: en_uk.previousMonth,
	};
	const nextMonth = {
		hi_IN: hi.nextMonth,
		en_IN: en.nextMonth,
		en_GB: en_uk.nextMonth,
	};

	return {
		previousMonth: previousMonth[`${lg}_${country}`] || previousMonth.en_GB,
		nextMonth: nextMonth[`${lg}_${country}`] || nextMonth.en_GB,
		months: months[`${lg}_${country}`] || months.en_GB,
		weekdays: weekdays[`${lg}_${country}`] || weekdays.en_GB,
		weekdaysShort: weekdaysShort[`${lg}_${country}`] || weekdaysShort.en_GB,
	};
};

export default getCalenderi18n;
