import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const CHECK_STRING_LENGTH = 2;
const LAST_VARIABLE_IN_STRING = 1;
const THIRD_STRING_VALUE = 3;

function hideDetails({
	data = '',
	type = 'number',
	countryCode = '',
}) {
	let finalString = data;
	if (!data) {
		return '';
	}

	if (type === 'number' && data?.length > CHECK_STRING_LENGTH) {
		finalString = `${countryCode}${data?.substring(
			GLOBAL_CONSTANTS.zeroth_index,
			THIRD_STRING_VALUE,
		)}****${data?.substring(
			data.length - CHECK_STRING_LENGTH,
			data.length,
		)}`;
	}

	if (type === 'mail') {
		const strings = data?.split('@');
		finalString = `${strings?.[GLOBAL_CONSTANTS.zeroth_index]?.substring(
			GLOBAL_CONSTANTS.zeroth_index,
			THIRD_STRING_VALUE,
		)}***@${
			strings?.[strings.length - LAST_VARIABLE_IN_STRING]
		}`;
	}

	return finalString;
}

export default hideDetails;
