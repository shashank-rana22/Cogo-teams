import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

const formatDataForDocuments = (rawValues, taskData, finalConfig) => {
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

	let finalArray = (modifiedRawValues?.documents || []).map(
		(documentObj, index) => {
			const FORMAT_OBJ = {};

			FORMAT_OBJ.document_type = modifiedRawValues?.document_types?.[index]
				|| taskData?.document_type
				|| 'authority_letter_custom';

			FORMAT_OBJ.document_url = documentObj?.url?.finalUrl
				|| documentObj?.url;

			FORMAT_OBJ.file_name = documentObj?.url?.fileName;

			Object.keys(documentObj || {}).forEach((key) => {
				if (!Object.keys(FORMAT_OBJ).includes(key)) {
					FORMAT_OBJ.data = {
						...(FORMAT_OBJ.data || {}),
						[key]: key === 'url' ? documentObj?.[key]?.finalUrl : documentObj?.[key],
					};
				}
			});

			return FORMAT_OBJ;
		},
	);

	const documentObjectControl = finalConfig?.controls?.find(
		(control) => control?.name === 'documents' && control?.type === 'fieldArray',
	) || {};

	const isMultipleUrlAllowed = documentObjectControl?.controls?.some(
		(control) => control?.name === 'url' && control?.multiple,
	);

	if (isMultipleUrlAllowed) {
		const tempFinal = finalArray.reduce((acc, item) => {
			const urls = item?.document_url;
			if (Array.isArray(urls)) {
				urls.forEach((urlObj) => {
					const singleObj = {
						...item,
						document_url : urlObj?.finalUrl || '',
						file_name    : urlObj?.fileName || '',
						data         : {
							...(item?.data || {}),
							url: urlObj?.finalUrl || '',
						},
					};
					acc.push(singleObj);
				});
			}
			return acc;
		}, []);

		finalArray = isEmpty(tempFinal) ? finalArray : tempFinal;
	}

	return finalArray?.length ? finalArray : undefined;
};

export default formatDataForDocuments;
