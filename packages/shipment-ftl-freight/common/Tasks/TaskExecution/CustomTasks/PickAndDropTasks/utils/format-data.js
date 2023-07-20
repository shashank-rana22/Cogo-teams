import { isEmpty } from '@cogoport/utils';

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
			const { image = '' } = documentItem.data;
			const data = {
				...documentItem.data,
				image: {
					name    : documentItem.data?.image?.fileName,
					url     : documentItem.data?.image?.finalUrl,
					success : true,
				},
			};
			if (image) {
				const obj = {
					document_type : doc_type,
					document_url  : image?.finalUrl || undefined,
					file_name     : image?.fileName || undefined,
					data          : data || {},
				};
				acc.push(obj);
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
