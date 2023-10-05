export const getOneTimeRecurrence = () => ({ type: 'normal' });

export const getDailyRecurrence = () => ({
	type         : 'normal',
	repeat_after : 1,
	unit         : 'day',
});

export const getWeeklyRecurrence = ({ weekly_repeat_on = [] }) => ({
	type         : 'normal',
	days_of_week : weekly_repeat_on || [],
});

export const getMonthlyRecurrence = ({ month_on_date = 0 }) => ({
	type          : 'normal',
	date_of_month : month_on_date,
});

export const getYearlyRecurrence = ({ yearly_month = 0, yearly_on_date = 0 }) => ({
	month_of_year : yearly_month,
	type          : 'normal',
	date_of_month : yearly_on_date,
});

export const getCustomRecurrence = ({ custom_on_date = 0 }) => ({
	type         : 'normal',
	repeat_after : custom_on_date,
	unit         : 'day',
});
