const getBlUploadRestrictMessage = ({ bl_state = [] }) => {
	const isAmend = bl_state?.find((i) => i === 'document_amendment_requested');
	if (isAmend) return 'Please amend Draft BL and then try to upload';

	return 'Please ask your KAM to Approve Draft BL';
};

export default getBlUploadRestrictMessage;
