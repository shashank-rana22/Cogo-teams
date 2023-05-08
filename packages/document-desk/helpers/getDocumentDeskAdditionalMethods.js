const getDocumentDeskAdditionalMethods = ({ documentDeskContextValues = {} }) => {
	const { activeTab } = documentDeskContextValues || {};
	const additional_methods = ['pagination'];

	if (['confirmed_by_service_provider', 'do_approval_pending', 'bl_approval_pending'].includes(activeTab)) {
		additional_methods.push('documents');
	}

	return additional_methods;
};

export default getDocumentDeskAdditionalMethods;
