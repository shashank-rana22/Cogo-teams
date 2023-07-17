import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const GET_FIRST_TWO_ELEMENTS = 2;

function getUserNameFromEmail({ email }) {
	const name = email.split('@')[GLOBAL_CONSTANTS.zeroth_index];

	const updatedName = name.replace('.', ' ').replace('_', ' ');

	return updatedName.split(' ', GET_FIRST_TWO_ELEMENTS).join(' ');
}

export default getUserNameFromEmail;
