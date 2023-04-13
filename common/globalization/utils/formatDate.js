import { format } from '@cogoport/utils';

import getGeoConstants from '../constants/geo';
import GLOBAL_CONSTANTS from '../constants/globals.json';

const geoConstants = getGeoConstants();

const formatTypeFunMapping = {
	date({ date, dateFormat }) {
		let formatDate = geoConstants?.formats.date.default;
		if (dateFormat in GLOBAL_CONSTANTS.formats.date) {
			formatDate = dateFormat;
		}

		return format(date, formatDate);
	},
	time({ date, timeFormat }) {
		let formatTime = geoConstants?.formats.time['12hrs'];
		if (timeFormat in GLOBAL_CONSTANTS.formats.time) {
			formatTime = timeFormat;
		}

		return format(date, formatTime);
	},
	dateTime({ date, timeFormat, dateFormat, separator = ' | ' }) {
		const formattedDate = this.date({ date, dateFormat });
		const formattedTime = this.time({ date, timeFormat });

		return `${formattedDate}${separator}${formattedTime}`;
	},
};

/**
 *  @typedef {Object}             [arguments]
 *  @property {date}     		  [date]
 *  @property {String}            [formatType - date|time|dateTime]
 *  @property {String}            [dateFormat]
 *  @property {String}            [timeFormat]
 *  @property {String}            [separator]
 */
const formatDate = (params) => {
	if (typeof window === 'undefined') {
		return null;
	}
	const { date, formatType } = params;

	if (!date) {
		return null;
	}

	let type = 'date';
	if (formatType in formatTypeFunMapping) {
		type = formatType;
	}

	return formatTypeFunMapping[type](params);
};

export default formatDate;
