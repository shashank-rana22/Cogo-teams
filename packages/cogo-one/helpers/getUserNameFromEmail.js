import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const GET_FIRST_TWO_ELEMENTS = 2;

function getUserNameFromEmail({ query = '' }) {
	const name = query.split('@')[GLOBAL_CONSTANTS.zeroth_index];

	const userName = name.replace('.', ' ').replace('_', ' ');

	const shortName = userName.split(' ', GET_FIRST_TWO_ELEMENTS).join(' ');

	return {
		shortName,
		userName,
	};
}

export default getUserNameFromEmail;
