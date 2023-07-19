import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const MIME_INDEX_IN_IMAGE = 1;
const BINARY_STRING_INDEX = 1;
const SINGLE_DECREMENT = 1;
const POSITIVE_VALUE_CHECK = 0;

function getFileObject(dataurl, filename) {
	const data = dataurl?.split(',');
	const mime = data[GLOBAL_CONSTANTS.zeroth_index].match(GLOBAL_CONSTANTS.regex_patterns.mime)[MIME_INDEX_IN_IMAGE];
	const bstr = atob(data[BINARY_STRING_INDEX]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n >= POSITIVE_VALUE_CHECK) {
		u8arr[n] = bstr.charCodeAt(n);
		n -= SINGLE_DECREMENT;
	}

	return { file: new File([u8arr], filename, { type: mime }) };
}

export default getFileObject;
