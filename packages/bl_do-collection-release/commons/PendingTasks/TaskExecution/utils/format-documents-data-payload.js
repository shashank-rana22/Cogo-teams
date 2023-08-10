const formatDataForDocuments = (rawValues, taskData) => {
	const modifiedRawValues = rawValues;

	const finalObj = (modifiedRawValues?.documents || []).map(
		(documentObj, index) => {
			const formatObj = {};

			formatObj.document_type = modifiedRawValues?.document_types?.[index]
				|| taskData?.document_type
				|| 'authority_letter_custom';

			formatObj.document_url = documentObj?.url?.finalUrl || documentObj?.url;

			formatObj.file_name = documentObj?.url?.fileName;

			Object.keys(documentObj || {}).forEach((key) => {
				if (!Object.keys(formatObj).includes(key)) {
					formatObj.data = {
						...(formatObj.data || {}),
						[key]: key === 'url' ? documentObj?.[key]?.finalUrl : documentObj?.[key],
					};
				}
			});

			return formatObj;
		},
	);

	return finalObj?.length ? finalObj : undefined;
};

export default formatDataForDocuments;
