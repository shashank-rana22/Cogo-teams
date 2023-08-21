import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const FIRST_INDEX = 1;

function range(start, stop) {
	const startCharCode = start.charCodeAt(GLOBAL_CONSTANTS.zeroth_index);
	const endCharCode = stop.charCodeAt(GLOBAL_CONSTANTS.zeroth_index);

	const RESULT = [];

	for (let charCode = startCharCode; charCode <= endCharCode; charCode += FIRST_INDEX) {
		RESULT.push(String.fromCharCode(charCode));
	}

	return RESULT;
}

const getValidPasswordMappings = (t) => ({
	lowercase: {
		characters : range('a', 'z'),
		message    : t('profile:lowercase_validation_message'),
	},
	uppercase: {
		characters : range('A', 'Z'),
		message    : t('profile:uppercase_validation_message'),
	},
	digit: {
		characters : range('0', '9'),
		message    : t('profile:digit_validation_message'),
	},
	special: {
		characters : '!@#$%^&*'.split(''),
		message    : t('profile:special_validation_message'),
	},
	minLength: {
		length  : 8,
		message : t('profile:min_length_validation_message'),
	},
});

export default getValidPasswordMappings;
