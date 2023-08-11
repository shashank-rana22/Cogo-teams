import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { addHours } from '@cogoport/utils';

import getWeekDates from '../../../../utils/getWeekDates';

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

	let validity_start = '';
	let validity_end = '';

	if (offlineStatus === '1_hour') {
		validity_start = new Date();
		validity_end = addHours(
			new Date(),
			ADD_HOURS_BY_ONE,
		);
	} else if (offlineStatus === '4_hour') {
		validity_start = new Date();
		validity_end = addHours(
			new Date(),
			ADD_HOURS_BY_FOUR,
		);
	} else if (offlineStatus === 'today') {
		validity_start = getStartDayTime();
		validity_end = getEndDayTime();
	} else if (offlineStatus === 'this_week') {
		const {
			startDate,
			endDate,
		} = getWeekDates();

		validity_start = startDate;
		validity_end = endDate;
	} else {
		validity_start = new Date();

		validity_end = (date && ofTime)
			? date.setHours(
				ofTime.getHours(),
				ofTime.getMinutes(),
				ofTime.getSeconds(),
			)
			: '';
	}

	const data = {
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
	};

	updateUserStatus(data);
};
