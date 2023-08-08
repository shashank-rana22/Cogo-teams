/* eslint-disable no-plusplus */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-bitwise */
const ZERO = 0;
const SIX = 6;
const TEN = 10;
const getDecodedPath = (str, precision) => {
	let index = ZERO;
	let lat = ZERO;
	let lng = ZERO;
	const COORDINATES = [];
	let shift = ZERO;
	let result = ZERO;
	let byte = null;
	let latitude_change;
	let longitude_change;
	const factor = TEN ** (precision || SIX);

	while (index < str.length) {
		byte = null;
		shift = 0;
		result = 0;

		do {
			byte = str.charCodeAt(index++) - 63;
			result |= (byte & 0x1f) << shift;
			shift += 5;
		} while (byte >= 0x20);

		latitude_change = result & 1 ? ~(result >> 1) : result >> 1;

		// eslint-disable-next-line no-multi-assign
		shift = result = 0;

		do {
			byte = str.charCodeAt(index++) - 63;
			result |= (byte & 0x1f) << shift;
			shift += 5;
		} while (byte >= 0x20);

		longitude_change = result & 1 ? ~(result >> 1) : result >> 1;

		lat += latitude_change;
		lng += longitude_change;

		COORDINATES.push([lat / factor, lng / factor]);
	}
	return COORDINATES;
};

export default getDecodedPath;
