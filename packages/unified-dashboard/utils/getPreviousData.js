import { format, subtractDays } from '@cogoport/utils';

const getPreviousData = (
	selectedFilterTab,
	data,
	filters,
	setFilters,
	analysisKey,
) => {
	switch (selectedFilterTab) {
		case 'month':
			{
				const prevMonth = analysisKey === 'revenue'
					? new Date(`${data?.month}${data?.year}`)
					: `${data[0].month} ${data[0].year}`;
				const dateString = new Date(prevMonth);
				const getLastDate = subtractDays(dateString, 1);

				const getStartDate = new Date(
					dateString.setMonth(dateString.getMonth() - 4),
				);

				const startDate = format(getStartDate, 'MM-dd-yyyy');
				const endDate = format(getLastDate, 'MM-dd-yyyy');

				setFilters({
					...filters,
					start_date : startDate,
					end_date   : endDate,
				});
			}
			break;

		case 'week':
			{
				const firstDay = new Date(
					`${data?.[0]?.year}/${data?.[0]?.month}/${data?.[0]?.day}`,
				);
				const lastDate = subtractDays(firstDay, 1);

				const getStartDate = subtractDays(firstDay, 28);
				const lastDateFormat = format(getStartDate, 'MM-dd-yyyy');
				const endDateFormat = format(lastDate, 'MM-dd-yyyy');

				setFilters({
					...filters,
					start_date : lastDateFormat,
					end_date   : endDateFormat,
				});
			}

			break;

		case 'quarter':
			{
				const previousQuarterMonth = new Date(
					`${data[0]?.year}/${data[0]?.month}/${data[0]?.day}`,
				);

				const getEndDate = subtractDays(previousQuarterMonth, 1);

				const previousQuarterFirstMonth = new Date(
					previousQuarterMonth.setMonth(previousQuarterMonth.getMonth() - 12),
				);

				const startDate = format(
					previousQuarterFirstMonth,
					'MM-dd-yyyy',
				);

				const endDate = format(getEndDate, 'MM-dd-yyyy');

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

export default getPreviousData;
