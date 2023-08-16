const ZEROTH_INDEX = 0;

const FIRST_INDEX = 1;

function range(start, stop) {
	const startCharCode = start.charCodeAt(ZEROTH_INDEX);
	const endCharCode = stop.charCodeAt(ZEROTH_INDEX);

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
