import { format } from '@cogoport/utils';

const mobileGetNextData = (data, filters, setFilters) => {
	const endDateString = new Date(`${data.month} ${data.year}`);
	endDateString.setMonth(endDateString.getMonth() + 1);
	const startDate = format(endDateString, 'MM-dd-yyyy');
	const getEndDate = new Date(
		endDateString.getFullYear(),
		endDateString.getMonth() + 1,
		0,
	);
	const endDate = format(getEndDate, 'MM-dd-yyyy');
	setFilters({ ...filters, start_date: startDate, end_date: endDate });
};

export default mobileGetNextData;
