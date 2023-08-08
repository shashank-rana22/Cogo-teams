import { toDate as nativeToDate, parseISO, parse } from 'date-fns';

const date = (input, formatString) => {
	if (!input) {
		return new Date();
	}
	if (input instanceof Date) {
		return input;
	}
	if (typeof input === 'string') {
		if (!formatString) {
			return parseISO(input);
		}
		return parse(input, formatString, new Date());
	}
	if (typeof input === 'number') {
		return nativeToDate(input);
	}
	throw new Error('Not a valid input type');
};

export default date;
