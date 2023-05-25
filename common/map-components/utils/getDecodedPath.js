/* eslint-disable no-bitwise */
const getDecodedPath = (str, precision) => {
	let index = 0;
	let lat = 0;
	let lng = 0;
	const coordinates = [];
	let shift = 0;
	let result = 0;
	let byte = null;
	let latitude_change;
	let longitude_change;
	const factor = 10 ** (precision || 6);

	while (index < str.length) {
		// Reset shift, result, and byte
		byte = null;
		shift = 0;
		result = 0;

		do {
			// eslint-disable-next-line no-plusplus
			byte = str.charCodeAt(index++) - 63;
			result |= (byte & 0x1f) << shift;
			shift += 5;
		} while (byte >= 0x20);

		latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

		shift = 0;
		result = 0;

		do {
			// eslint-disable-next-line no-plusplus
			byte = str.charCodeAt(index++) - 63;
			result |= (byte & 0x1f) << shift;
			shift += 5;
		} while (byte >= 0x20);

		longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

		lat += latitude_change;
		lng += longitude_change;

		coordinates.push([lat / factor, lng / factor]);
	}

	return coordinates;
};

export default getDecodedPath;
