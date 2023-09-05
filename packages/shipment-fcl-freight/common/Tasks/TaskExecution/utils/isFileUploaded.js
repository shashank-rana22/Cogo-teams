import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function isValidDocumentUrl(url) {
	return (
		(typeof url === 'string' && url !== '')
    || (typeof url === 'object' && url?.fileName && url?.finalUrl)
	);
}

function isFileUploaded(data) {
	if (!data || !data?.documents || data?.documents.length === GLOBAL_CONSTANTS.zeroth_index) {
		return false;
	}

	return (data?.documents || []).some((document) => isValidDocumentUrl(document?.url));
}

export default isFileUploaded;
