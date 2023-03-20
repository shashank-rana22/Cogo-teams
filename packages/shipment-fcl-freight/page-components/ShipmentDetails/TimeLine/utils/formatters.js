import { format } from '@cogoport/utils';

export function getDate(date, dateFormat = 'dd MMM yyyy - hh:mm aaa') {
	return date ? format(date, dateFormat, null, true) : null;
}
