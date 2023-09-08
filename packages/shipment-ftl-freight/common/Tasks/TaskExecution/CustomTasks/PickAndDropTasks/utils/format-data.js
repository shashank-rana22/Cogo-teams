import { isEmpty } from '@cogoport/utils';

import { getFileName } from '../../../utils/get-file-name';

export const formatPendingTaskData = ({
	val = {},
	task = {},
	doc_type = '',
}) => {
	const payload = {
		id: task?.id,
	};
	const documents = (val?.service_data || []).reduce(
		(acc, documentItem = {}) => {
			const { image = [] } = documentItem.data || {};
			if (Array.isArray(image)) {
				image.forEach((img) => {
					if (!isEmpty(img)) {
						const fileUrl = img?.finalUrl || img;

						const dataObj = {
							...(documentItem?.data || {}),
							url       : fileUrl,
							file_name : getFileName(fileUrl),
						};
						const obj = {
							document_type : doc_type,
							document_url  : fileUrl,
							file_name     : getFileName(fileUrl),
							data          : dataObj,
						};
						acc.push(obj);
					}
				});
			}
			return acc;
		},
		[],
	);
	if (isEmpty(documents)) {
		return payload;
	}
	payload.data = {};
	payload.data.documents = documents;
	return payload;
};
