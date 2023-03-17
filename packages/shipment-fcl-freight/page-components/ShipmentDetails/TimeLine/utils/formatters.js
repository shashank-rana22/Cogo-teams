import { format } from '@cogoport/utils';

export function getDate(date, dateFormat = 'dd MMM yyyy - hh:mm aaa') {
	return date ? format(date, dateFormat, null, true) : null;
}

export function getDateDefaultValue(date, offset) {
	const tempDate = new Date(date);
	if (tempDate.toDateString() !== 'Invalid Date') {
		return new Date(tempDate.getTime() + offset);
	} return '';
}
