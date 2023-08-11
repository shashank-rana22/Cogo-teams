import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { addHours } from '@cogoport/utils';

import getWeekDates from '../../../../../../utils/getWeekDates';

const ADD_HOURS_BY_ONE = 1;
const ADD_HOURS_BY_FOUR = 4;
const MIN_START_HOURS = 0;
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

export const getStartDayTime = () => new Date(
	(new Date()).setHours(
		MIN_START_HOURS,
		MIN_START_HOURS,
		MIN_START_HOURS,
		MIN_START_HOURS,
	),
);

const getValidityEndMapping = ({ date = '', ofTime = '' }) => {
	const { endDate } = getWeekDates();

	return {
		'1_hour': addHours(
			new Date(),
			ADD_HOURS_BY_ONE,
		),
		'4_hour': addHours(
			new Date(),
			ADD_HOURS_BY_FOUR,
		),
		today     : getEndDayTime(),
		this_week : endDate,
		custom    : (date && ofTime)
			? date.setHours(
				ofTime.getHours(),
				ofTime.getMinutes(),
				ofTime.getSeconds(),
			) : '',
	};
};

export const createSubmit = ({
	watch = () => {},
	updateUserStatus = () => {},
}) => {
	const {
		reason = '',
		comment = '',
		ofTime = '',
		date = '',
		offlineStatus = '',
	} = watch();

	const validity_start = new Date();

	const validityEndMapping = getValidityEndMapping({ date, ofTime });

	const validity_end = validityEndMapping[offlineStatus] || validityEndMapping.custom;

	updateUserStatus({
		status         : 'break',
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
		reason: reason === 'others' ? comment : reason,
	});
};
