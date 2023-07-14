const INDEX_VALUE = 1;

export const formatBulkUpdateData = ({ val = {}, shipment_data = {} }) => {
	const { documents = [] } = val;

	const payload = {
		service      : 'ftl_freight',
		service_data : [],
	};
	const { all_services = [] } = shipment_data;

	all_services.forEach((item) => {
		const eachTruckPayload = {
			service_id : item.id,
			data       : {
				eway_bill_details: [],
			},
		};

		documents.forEach((documentItem = {}) => {
			const {
				truck_number = '',
				eway_bill_number = '',
				ewb_validity = '',
				eway_bill_generation_date = '',
				description = '',
			} = documentItem;
			if (truck_number === item?.id) {
				eachTruckPayload.data.eway_bill_details.push({
					eway_bill_number,
					ewb_validity,
					eway_bill_generation_date,
					remarks: description,
				});
			}
		});

		payload.service_data.push(eachTruckPayload);
	});

	return payload;
};

export const formatPendingTaskData = ({ val = {}, task = {} }) => {
	const payload = {
		id   : task?.id,
		data : {},
	};

	const documents = (val?.documents || []).map((documentItem = {}) => {
		const {
			url = '',
			truck_number = '',
			eway_bill_number = '',
			ewb_validity = '',
			description = '',
		} = documentItem;
		const getFileName = (fileUrl) => {
			const values = fileUrl?.split('/');
			const lastVal = values[values.length - INDEX_VALUE];
			const words = lastVal.split('%');
			let filename = '';
			words.forEach((word) => {
				filename += word;
			});
			return filename;
		};

		return {
			document_type : 'ftl_eway_bill_copy',
			document_url  : url?.finalUrl || url,
			file_name     : url?.fileName || getFileName(url?.finalUrl),
			data          : {
				url: url?.finalUrl || url,
				truck_number,
				ewb_validity,
				eway_bill_number,
				description,
			},
		};
	});

	payload.data.documents = documents;

	return payload;
};
