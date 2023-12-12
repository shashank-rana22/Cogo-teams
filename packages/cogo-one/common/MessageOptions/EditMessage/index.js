import React from 'react';

import useGetCommunication from '../../../hooks/useGetCommunication';
import Footer from '../../../page-components/CogoOneChannel/Conversations/TeamChats/Footer';

function EditMessage({
	setEditMessage = () => {},
	isMobile = false,
	activeTab = {},
	eachMessage = {},
	draftMessages = {},
	setDraftMessages = () => {},
	draftUploadedFiles = {},
	setDraftUploadedFiles = () => {},
}) {
	const { communication_id = '' } = eachMessage || {};
	const {
		communicationData = {},
		loading = false,
	} = useGetCommunication({ communicationId: communication_id });

	const handleClose = () => {
		setEditMessage(false);
	};

	return (
		<Footer
			key={loading}
			hasPermissionToEdit
			activeTab={activeTab}
			isMobile={isMobile}
			draftMessages={draftMessages}
			setDraftMessages={setDraftMessages}
			draftUploadedFiles={draftUploadedFiles}
			setDraftUploadedFiles={setDraftUploadedFiles}
			communicationData={communicationData}
			communicationLoading={loading}
			callbackFunc={handleClose}
		/>
	);
}

export default EditMessage;
