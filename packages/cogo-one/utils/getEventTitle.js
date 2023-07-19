const GET_LAST_STRING = 1;

export const getEventTitle = ({ name = '' }) => {
	const checkNameFarmat = name.includes(':');

	if (checkNameFarmat) {
		const parts = name.split(':');
		return parts[parts.length - GET_LAST_STRING];
	}

	return name;
};
