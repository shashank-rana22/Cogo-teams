const getBlUploadRestrictMessage = ({ bl_state }) => {
	const is_amend = bl_state?.find((i) => i === 'document_amendment_requested');
	if (is_amend) return 'Please amend Draft BL and then try to upload';

	return 'Please ask your KAM to Approve Draft BL';
};

export default getBlUploadRestrictMessage;
