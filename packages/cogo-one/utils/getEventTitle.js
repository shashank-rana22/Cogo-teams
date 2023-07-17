const GET_LAST_STRING = 1;
export const getEventTitle = ({ name = '' }) => {
	const checkNameFarmat = name.includes(':');
	let eventTitle = '';
	if (checkNameFarmat) {
		const parts = name.split(':');
		eventTitle = parts[parts.length - GET_LAST_STRING];
	} else {
		eventTitle = name;
	}
	return eventTitle;
};
