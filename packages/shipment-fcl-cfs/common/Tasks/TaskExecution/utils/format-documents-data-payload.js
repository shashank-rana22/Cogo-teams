const formatDataForDocuments = (rawValues, taskData) => {
	let modifiedRawValues = {};

	if (taskData?.task === 'upload_commercial_invoice_and_packing_list') {
		modifiedRawValues.documents = [];

		modifiedRawValues.document_types = ['invoice', 'packing_list'];

		Object.keys(rawValues).forEach((key) => {
			if (key?.includes('documents')) {
				modifiedRawValues.documents.push(rawValues[key]?.[0]);
			} else {
				modifiedRawValues[key] = rawValues[key];
			}
		});
	} else {
		modifiedRawValues = rawValues;
	}

	const finalObj = (modifiedRawValues?.documents || []).map(
		(documentObj, index) => {
			const formatObj = {};

			formatObj.document_type = modifiedRawValues?.document_types?.[index]
				|| taskData?.document_type
				|| 'authority_letter_custom';

			formatObj.document_url = documentObj?.url?.url || documentObj?.url;

			formatObj.file_name = documentObj?.url?.name;

			Object.keys(documentObj || {}).forEach((key) => {
				if (!Object.keys(formatObj).includes(key)) {
					formatObj.data = {
						...(formatObj.data || {}),
						[key]: key === 'url' ? documentObj?.[key]?.url : documentObj?.[key],
					};
				}
			});

			return formatObj;
		},
	);

	return finalObj?.length ? finalObj : undefined;
};

export default formatDataForDocuments;
