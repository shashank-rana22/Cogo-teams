const extraApiPayload = (values, end_point) => {
	if (end_point === 'create_shipment_document') {
		let documentArr = values?.documents;

		if (!documentArr) documentArr = [values];

		const formatValues = (documentArr || []).map((obj) => {
			const newObj = JSON.parse(JSON.stringify(obj || {}));

			delete newObj?.url;

			return {
				file_name    : obj?.url?.name,
				document_url : obj?.url?.url || obj?.url,
				data         : { ...(newObj || {}) },
			};
		});

		return { documents: formatValues };
	}

	if (end_point === 'update_shipment_service') return { data: values };

	return values;
};
export default extraApiPayload;
