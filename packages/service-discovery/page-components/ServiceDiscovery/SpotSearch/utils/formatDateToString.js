import { format, formatISO } from 'date-fns';

import date from './date';

const formatDateToString = (inputDate, formatString) => {
	if (!formatString) {
		return formatISO(date(inputDate));
	}

	return format(date(inputDate), formatString);
};

export default formatDateToString;
