import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const HIDDEN_PREFIX_LENGTH = 2;
const HIDDEN_SUFFIX_LENGTH = 2;
const EMAIL_PREFIX_LENGTH = 3;

const ONE = 1;

const hideDetails = (data = '', type = '') => {
	let finalString = '';
	if (type === 'number') {
		finalString = `${data.substring(
			GLOBAL_CONSTANTS.zeroth_index,
			HIDDEN_PREFIX_LENGTH,
		)}****${data.substring(data.length - HIDDEN_SUFFIX_LENGTH, data.length)}`;
	}

	if (type === 'mail') {
		const strings = data.split('@');
		finalString = `${strings[GLOBAL_CONSTANTS.zeroth_index].substring(
			GLOBAL_CONSTANTS.zeroth_index,
			EMAIL_PREFIX_LENGTH,
		)}****@${strings[strings.length - ONE]}`;
	}

	return finalString;
};

export default hideDetails;
