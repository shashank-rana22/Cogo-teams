import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const formatDataForDocuments = (rawValues, taskData) => {
	let modifiedRawValues = {};

	if (taskData?.task === 'upload_commercial_invoice_and_packing_list') {
		modifiedRawValues.documents = [];

		modifiedRawValues.document_types = ['invoice', 'packing_list'];

		Object.keys(rawValues).forEach((key) => {
			if (key?.includes('documents')) {
				modifiedRawValues.documents.push(rawValues[key]?.[GLOBAL_CONSTANTS.zeroth_index]);
			} else {
				modifiedRawValues[key] = rawValues[key];
			}
		});
	} else {
		modifiedRawValues = rawValues;
	}

	const finalObj = (modifiedRawValues?.documents || []).map(
		(documentObj, index) => {
			const FORMAT_OBJ = {};

			FORMAT_OBJ.document_type = modifiedRawValues?.document_types?.[index]
				|| taskData?.document_type
				|| 'authority_letter_custom';

			FORMAT_OBJ.document_url = documentObj?.url?.finalUrl || documentObj?.url;

			FORMAT_OBJ.file_name = documentObj?.url?.fileName;

			Object.keys(documentObj || {}).forEach((key) => {
				if (!Object.keys(FORMAT_OBJ).includes(key)) {
					FORMAT_OBJ.data = {
						...(FORMAT_OBJ.data || {}),
						[key]: key === 'url' ? documentObj?.[key]?.url : documentObj?.[key],
					};
				}
			});

			return FORMAT_OBJ;
		},
	);

	return finalObj?.length ? finalObj : undefined;
};

export default formatDataForDocuments;
