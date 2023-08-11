import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const CHECK_STRING_LENGTH = 2;
const LAST_VARIABLE_IN_STRING = 1;
const FIRST_STRING_VALUE = 0;
const THIRD_STRING_VALUE = 3;

function getHidedUserDetails({
	data = '',
	type = 'number',
	countryCode = '',
}) {
	let finalString = data;
	if (type === 'number' && data?.length > CHECK_STRING_LENGTH) {
		finalString = `${countryCode} ${data.substring(FIRST_STRING_VALUE, THIRD_STRING_VALUE)}xxx${data.substring(
			data.length - CHECK_STRING_LENGTH,
			data.length,
		)}`;
	}

	if (type === 'mail') {
		const strings = data?.split('@');
		finalString = `${strings[GLOBAL_CONSTANTS.zeroth_index].substring(
			FIRST_STRING_VALUE,
			THIRD_STRING_VALUE,
		)}xxx@${
			strings[strings.length - LAST_VARIABLE_IN_STRING]
		}`;
	}

	return finalString;
}

export default getHidedUserDetails;
