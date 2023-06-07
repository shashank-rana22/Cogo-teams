import { format } from '@cogoport/utils';

const mobileGetPreviousData = (data, filters, setFilters) => {
	const prevMonth = `${data.month} ${
		data.year
	}`;
	const dateString = new Date(prevMonth);
	dateString.setMonth(dateString.getMonth() - 1);
	const startDate = format(dateString, 'MM-dd-yyyy');
	const getEndDate = new Date(
		dateString.getFullYear(),
		dateString.getMonth() + 1,
		0,
	);
	const endDate = format(getEndDate, 'MM-dd-yyyy');
	setFilters({
		...filters,
		start_date : startDate,
		end_date   : endDate,
	});
};

export default mobileGetPreviousData;
