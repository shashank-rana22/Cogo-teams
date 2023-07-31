import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const TOTAL_HOURS = 24;
const TOTAL_MINUTES_OR_SECONDS = 60;
const TOTAL_MILLISECONDS = 1000;

const getDuration = ({ timeRange }) => {
	const DAYS_MAPPING = {
		'1D' : 1,
		'1W' : 7,
		'1M' : 30,
		'6M' : 180,
		'1Y' : 365,
	};

	const today = new Date();

	const endDate = formatDate({
		date       : Date.now(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	});

	const startDateValue = new Date(today.getTime() - DAYS_MAPPING[timeRange]
    * TOTAL_HOURS * TOTAL_MINUTES_OR_SECONDS * TOTAL_MINUTES_OR_SECONDS
    * TOTAL_MILLISECONDS);

	const startDate = formatDate({
		date       : startDateValue,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	});

	return ({ startDate, endDate });
};

export default getDuration;
