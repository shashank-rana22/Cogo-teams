import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const PASSWORD_MIN_LENGTH = 8;
const FIRST_INDEX = 1;

function range(start, stop) {
	const START_CHAR_CODE = start.charCodeAt(GLOBAL_CONSTANTS.zeroth_index);
	const END_CHAR_CODE = stop.charCodeAt(GLOBAL_CONSTANTS.zeroth_index);

	const RESULT = [];

	for (let charCode = START_CHAR_CODE; charCode <= END_CHAR_CODE; charCode += FIRST_INDEX) {
		RESULT.push(String.fromCharCode(charCode));
	}

	return RESULT;
}

const VALID_PASSWORD_MAPPINGS = {
	lowercase: {
		characters : range('a', 'z'),
		message    : 'at least one lowercase character.',
	},
	uppercase: {
		characters : range('A', 'Z'),
		message    : 'at least one uppercase character.',
	},
	digit: {
		characters : range('0', '9'),
		message    : 'at least one digit.',
	},
	special: {
		characters : '!@#$%^&*'.split(''),
		message    : 'at least one special character.',
	},
	minLength: {
		length  : PASSWORD_MIN_LENGTH,
		message : 'minimum 8 characters.',
	},
};

export default VALID_PASSWORD_MAPPINGS;
