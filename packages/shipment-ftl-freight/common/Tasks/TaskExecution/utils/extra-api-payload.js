const NUMBER_KEYS = ['bls_count', 'volume', 'weight', 'packages_count'];

const NOT_INCLUDE_FIELD_IN_FTL = [
	'truck_details_count',
	'id',
	'display_booked_trucks',
	'display_booking_weight',
	'display_destination_location',
	'display_origin_location',
	'trailer_details_count',
	'container_details_count',
];

const extraApiPayload = (values, end_point, task) => {
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

	if (end_point === 'bulk_update_shipment_services') {
		const payload = {
			service      : task.shipment_type,
			service_data : [],
		};

		payload.service_data = task.task_field_ids.map((item) => {
			const data = {};

			Object.keys(values).forEach((key) => {
				if (key === 'truck_details') {
					const index = values[key].findIndex((ind) => ind.id === item);

					Object.keys(values[key][index]).forEach((lineItem) => {
						if (lineItem === 'name' || lineItem === 'contact') {
							if ('driver_details' in data) {
								data.driver_details[lineItem] = values[key][index][lineItem];
							} else {
								data.driver_details = {};
								data.driver_details[lineItem] = values[key][index][lineItem];
							}
						} else if (!NOT_INCLUDE_FIELD_IN_FTL.includes(lineItem)) {
							if (NUMBER_KEYS.includes(lineItem)) {
								data[lineItem] = Number(values[key][index][lineItem] || 1);
							} else {
								data[lineItem] = values[key][index][lineItem];
							}
						}
					});
				} else if (key === 'cargo_dimension') {
					const cargo_dimensions = values[key][0];
					const { length, breadth, height, unit } = cargo_dimensions;
					data[key] = {
						length,
						breadth,
						height,
						unit,
					};
				} else if (!NOT_INCLUDE_FIELD_IN_FTL.includes(key)) {
					if (NUMBER_KEYS.includes(key)) {
						data[key] = Number(values[key] || 1);
					} else {
						data[key] = values[key];
					}
				}
			});

			return {
				service_id: item,
				data,
			};
		});

		return payload;
	}

	return values;
};
export default extraApiPayload;
