export const formatLRData = ({ val, shipment_data }) => {
	const { documents } = val;

	const payload = {
		service: 'ftl_freight',
		service_data: [],
	};
	const { all_services = [] } = shipment_data;

	all_services.forEach((item) => {
		const eachTruckPayload = {
			service_id: item.id,
			data: {
				lr_numbers: [],
			},
		};

		documents.forEach((documentItem) => {
			const service_id = documentItem?.service_id.split(':')[1];
			if (service_id === item.id) {
				eachTruckPayload.data.lr_numbers.push(documentItem.lr_number);
			}
		});

		payload.service_data.push(eachTruckPayload);
	});

	return payload;
};

export const formatTaskData = ({ val, task }) => {
	const payload = {
		id: task?.id,
		data: {},
	};

	const documents = val.documents.map((documentItem) => {
		return {
			document_type: 'lorry_receipt',
			document_url: documentItem?.url?.url,
			file_name: documentItem?.url?.name,
			data: {
				url: documentItem?.url?.url,
				quantity: documentItem?.quantity,
				lr_number: documentItem?.lr_number,
				service_id: documentItem?.service_id?.split(':')[1],
				description: documentItem?.description,
			},
		};
	});

	payload.data.documents = documents;

	return payload;
};
