const CANCEL_REASON_MAPPING = {
	greater_than          : '>',
	less_than             : '<',
	greater_than_equal_to : '>=',
	less_than_equal_to    : '<=',
};

export const CANCEL_REVERSE_MAPPING = {
	'>'  : 'greater_than',
	'<'  : 'less_than',
	'>=' : 'greater_than_equal_to',
	'<=' : 'less_than_equal_to',
};

export default CANCEL_REASON_MAPPING;
