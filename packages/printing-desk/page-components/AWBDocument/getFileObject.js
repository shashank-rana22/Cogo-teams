import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const MIME_INDEX_IN_IMAGE = 1;
const BINARY_STRING_INDEX = 1;
const SINGLE_DECREMENT = 1;

function getFileObject(dataurl, filename) {
	const data = dataurl?.split(',');

	console.log('data', data);
	const mime = data[GLOBAL_CONSTANTS.zeroth_index].match(GLOBAL_CONSTANTS.regex_patterns.mime)[MIME_INDEX_IN_IMAGE];
	const bstr = atob(data[BINARY_STRING_INDEX]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (!isEmpty(n)) {
		u8arr[n] = bstr.charCodeAt(n);
		n -= SINGLE_DECREMENT;
	}

	return { file: new File([u8arr], filename, { type: mime }) };
}

export default getFileObject;
