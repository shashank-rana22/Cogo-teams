import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const FIRST = 1;

export const snakeCaseToTitleCase = (str) => {
	const titleCase = str
		.toLowerCase()
		.split('_')
		.map((word) => word.charAt(GLOBAL_CONSTANTS.zeroth_index).toUpperCase() + word.slice(FIRST))
		.join(' ');

	return titleCase;
};
