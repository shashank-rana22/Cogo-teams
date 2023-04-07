const offset = new Date().getTimezoneOffset() * 60 * 1000;

export function getPrefillValue(date) {
	const tempDate = new Date(date);

	if (date != null && tempDate.toDateString() !== 'Invalid Date') {
		return new Date(tempDate.getTime() + offset);
	} return null;
}

export function getDateForPayload(date) {
	const tempDate = new Date(date);

	if (date != null && tempDate.toDateString() !== 'Invalid Date') {
		return new Date(tempDate.getTime() - offset);
	} return undefined;
}
