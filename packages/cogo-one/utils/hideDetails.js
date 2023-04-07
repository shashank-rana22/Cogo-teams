function hideDetails({
	data = '',
	type = 'number',
}) {
	let finalString = data;
	if (type === 'number' && data?.length > 2) {
		finalString = `${data.substring(0, 3)}****${data.substring(
			data.length - 2,
			data.length,
		)}`;
	}

	if (type === 'mail') {
		const strings = data?.split('@');
		finalString = `${strings[0].substring(0, 3)}****@${
			strings[strings.length - 1]
		}`;
	}

	return finalString;
}

export default hideDetails;
