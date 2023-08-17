const getBlUploadRestrictMessage = ({ blState = [] }) => {
	const isAmend = blState?.find((state) => state === 'document_amendment_requested');
	if (isAmend) return 'Please amend Draft BL and then try to upload';

	return 'Please ask your KAM to Approve Draft BL';
};

export default getBlUploadRestrictMessage;
