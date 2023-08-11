import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const MAX_START_HOURS = 23;
const MIN_SECOND = 59;
const MIN_MINUTES = 59;
const MIN_MILLI_SECOND = 999;

export const getEndDayTime = () => new Date(
	(new Date()).setHours(
		MAX_START_HOURS,
		MIN_MINUTES,
		MIN_SECOND,
		MIN_MILLI_SECOND,
	),
);

export const createSubmit = ({
	watch = () => {},
	updateUserStatus = () => {},
}) => {
	const {
		reason = '',
		date = '',
	} = watch();

	const validity_start = new Date();

	const validity_end = date || '';

	updateUserStatus({
		status         : 'on_leave',
		validity_start : formatDate({
			date       : validity_start,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		}),
		validity_end: formatDate({
			date       : validity_end,
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		}),
		reason,
	});
};
