import { format } from '@cogoport/utils';

export const formatDate = (
	date: Date,
	dateformat: string,
	options: object,
	utcInput: boolean,
) => format(date, dateformat, options, utcInput);
