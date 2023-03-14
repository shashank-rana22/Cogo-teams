export const formatTaskData = ({ val = {}, task = {} }) => {
	const payload = {
		id: task?.id,
		data: {},
	};

	const documents = (val.documents || []).map((documentItem) => {
		return {
			document_type: 'indent',
			document_url: documentItem?.url?.url,
			file_name: documentItem?.url?.name,
			data: {
				url: documentItem?.url?.url,
				description: documentItem?.description,
			},
		};
	});

	payload.data.documents = documents;

	return payload;
};
