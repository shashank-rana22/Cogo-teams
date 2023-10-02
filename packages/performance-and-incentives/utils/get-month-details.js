import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const OFFSET = 1;
const TOTAL_MONTHS = 12;

const getMonthDetails = () => {
	const currentDate = new Date();

	const currentMonth = currentDate.getMonth();

	return {
		currMonth : GLOBAL_CONSTANTS.months[currentMonth],
		lastMonth : GLOBAL_CONSTANTS.months[(currentMonth - OFFSET + TOTAL_MONTHS) % TOTAL_MONTHS],
	};
};

export default getMonthDetails;
