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

const NUMBER_KEYS = ['bls_count', 'volume', 'weight', 'packages_count'];

const DEFAULT_VALUE_FOR_NUMBER_KEYS = 1;

const extraApiPayload = (values, endPoint, task) => {
	if (endPoint === 'send_nomination_notification') {
		return {
			booking_reference_number : values?.booking_reference_number,
			booking_reference_proof  : {
				success : true,
				url     : values?.booking_reference_proof,
				name    : 'Booking Reference Proof',
			},
		};
	}

	if (['create_shipment_document', 'fcl_freight/create_document'].includes(endPoint)) {
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

	if (endPoint === 'update_shipment_service') return { data: values };

	if (endPoint === 'bulk_update_shipment_services') {
		const payload = {
			service      : task.shipment_type,
			service_data : [],
		};

		payload.service_data = task.task_field_ids.map((item) => {
			const DATA = {};

			Object.keys(values).forEach((key) => {
				if (key === 'truck_details') {
					const index = values[key].findIndex((ind) => ind.id === item);

					Object.keys(values[key][index]).forEach((lineItem) => {
						if (lineItem === 'name' || lineItem === 'contact') {
							if ('driver_details' in DATA) {
								DATA.driver_details[lineItem] = values[key][index][lineItem];
							} else {
								DATA.driver_details = {};
								DATA.driver_details[lineItem] = values[key][index][lineItem];
							}
						} else if (!NOT_INCLUDE_FIELD_IN_FTL.includes(lineItem)) {
							if (NUMBER_KEYS.includes(lineItem)) {
								DATA[lineItem] = Number(values[key][index][lineItem] || DEFAULT_VALUE_FOR_NUMBER_KEYS);
							} else {
								DATA[lineItem] = values[key][index][lineItem];
							}
						}
					});
				} else if (!NOT_INCLUDE_FIELD_IN_FTL.includes(key)) {
					if (NUMBER_KEYS.includes(key)) {
						DATA[key] = Number(values[key] || DEFAULT_VALUE_FOR_NUMBER_KEYS);
					} else {
						DATA[key] = values[key];
					}
				}
			});

			return {
				service_id : item,
				data       : DATA,
			};
		});

		return payload;
	}

	if (endPoint === 'update_shipment_bl_details'
	&& ['update_mbl_collection_status', 'update_hbl_collection_status'].includes(task?.task)) {
		const payload = {
			ids  : values?.bl_detail?.map((i) => i?.id),
			data : { bl_detail: values?.bl_detail },
		};

		return payload;
	}

	return values;
};
export default extraApiPayload;
