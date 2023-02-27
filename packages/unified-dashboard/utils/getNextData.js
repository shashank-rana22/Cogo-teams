import { format, addDays, subtractDays } from '@cogoport/utils';

const getNextData = (
	selectedFilterTab,
	data,
	filters,
	setFilters,
	analysisKey,
) => {
	switch (selectedFilterTab) {
		case 'month':
			{
				const endMonth =					analysisKey === 'revenue' ? data[0] : data[data.length - 1];
				const endDateString = new Date(`${endMonth.month} ${endMonth.year}`);
				const getStartDate = new Date(
					endDateString.setMonth(endDateString.getMonth() + 1),
				);

				const getEndDate = new Date(
					endDateString.setMonth(endDateString.getMonth() + 4),
				);
				const getLastDate = subtractDays(getEndDate, 1);

				const startDate = format(getStartDate, 'MM-dd-yyyy');
				const endDate = format(getLastDate, 'MM-dd-yyyy');

				setFilters({ ...filters, start_date: startDate, end_date: endDate });
			}
			break;

		case 'week':
			{
				const firstDay = new Date(
					`${data[data.length - 1].year}/${data[data.length - 1].month}/${
						data[data.length - 1].day
					}`,
				);

				const getStartDate = addDays(firstDay, 7);

				const getLastDate = addDays(getStartDate, 27);

				const startDate = format(getStartDate, 'MM-dd-yyyy');
				const endDate = format(getLastDate, 'MM-dd-yyyy');
				setFilters({
					...filters,
					start_date : startDate,
					end_date   : endDate,
				});
			}

			break;
		case 'quarter':
			{
				const firstDay = new Date(
					`${data[data.length - 1].year}/${data[data.length - 1].month}/${
						data[data.length - 1].day
					}`,
				);

				const nextQuarterMonth = new Date(
					firstDay.setMonth(firstDay.getMonth() + 3),
				);

				const nextQuarterLastMonth = new Date(
					firstDay.setMonth(firstDay.getMonth() + 12),
				);

				const getLastDate = subtractDays(nextQuarterLastMonth, 1);

				const startDate = format(nextQuarterMonth, 'MM-dd-yyyy');
				const endDate = format(getLastDate, 'MM-dd-yyyy');

				setFilters({
					...filters,
					start_date : startDate,
					end_date   : endDate,
				});
			}
			break;
		default:
			break;
	}
};

export default getNextData;
