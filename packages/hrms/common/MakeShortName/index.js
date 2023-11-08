import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const makeShortName = (name) => {
	if (isEmpty(name)) return '';
	const words = name?.split(' ');
	const firstInitial = words?.[GLOBAL_CONSTANTS.zeroth_index][GLOBAL_CONSTANTS.zeroth_index]?.toUpperCase();
	const lastInitial = words?.[words.length - 1][GLOBAL_CONSTANTS.zeroth_index]?.toUpperCase();
	return firstInitial + lastInitial;
};

export default makeShortName;
