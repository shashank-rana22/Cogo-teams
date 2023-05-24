function range(start, stop) {
	const startCharCode = start.charCodeAt(0);
	const endCharCode = stop.charCodeAt(0);

	const result = [];

	for (let charCode = startCharCode; charCode <= endCharCode; charCode += 1) {
		result.push(String.fromCharCode(charCode));
	}

	return result;
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
		length  : 8,
		message : 'minimum 8 characters.',
	},
};

export default VALID_PASSWORD_MAPPINGS;
