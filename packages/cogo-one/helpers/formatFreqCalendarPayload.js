export const getOneTimeRecurrence = () => ({ type: 'normal' });

export const getDailyRecurrence = () => ({
	type         : 'normal',
	repeat_after : 1,
	unit         : 'day',
});

export const getWeeklyRecurrence = ({ weekly_repeat_on = [], days_of_week = [], id = '' }) => ({
	type         : 'normal',
	days_of_week : !id ? weekly_repeat_on : days_of_week,
});

export const getMonthlyRecurrence = ({ month_on_date = 0, date_of_month = 0, id = '' }) => ({
	type          : 'normal',
	date_of_month : !id ? month_on_date : date_of_month,
});

export const getYearlyRecurrence = ({
	yearly_month = 0, yearly_on_date = 0,
	month_of_year = 0, date_of_month = 0, id = '',
}) => ({
	month_of_year : !id ? yearly_month : month_of_year,
	type          : 'normal',
	date_of_month : yearly_on_date || date_of_month,
});

export const getCustomRecurrence = ({ custom_on_date = 0, repeat_after = 0, id = '' }) => ({
	type         : 'normal',
	repeat_after : !id ? custom_on_date : repeat_after,
	unit         : 'day',
});
