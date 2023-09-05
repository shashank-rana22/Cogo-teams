import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

function isValidDocumentUrl(url) {
	return (
		(typeof url === 'string' && url !== '')
    || (typeof url === 'object' && url?.finalUrl)
	);
}

function isFileUploaded(data) {
	if (isEmpty(data) || isEmpty(data?.documents) || data?.documents?.length === GLOBAL_CONSTANTS.zeroth_index) {
		return false;
	}

	return (data?.documents || []).every((document) => isValidDocumentUrl(document?.url));
}

export default isFileUploaded;
