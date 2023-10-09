import { format } from '@cogoport/utils';

export const formatDate = (
	date,
	dateformat,
	options,
	utcInput,
) => format(date, dateformat, options, utcInput);
