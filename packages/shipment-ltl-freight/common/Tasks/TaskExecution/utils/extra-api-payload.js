const NUMBER_KEYS = ['bls_count', 'volume', 'weight', 'packages_count'];

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
		if (task.task === 'tag_service_providers') {
			const ltl_freight_vendor_mappings = {
				service                     : task.shipment_type,
				ltl_freight_vendor_mappings : {
					shipment_id     : task.shipment_id,
					vendor_mappings : [],
				},
			};

			Object.keys(values).forEach((key) => {
				task.task_field_ids.forEach((item) => {
					if (item === values[key][0].service_id) {
						values[key].forEach((element) => {
							ltl_freight_vendor_mappings.ltl_freight_vendor_mappings.vendor_mappings.push(
								{
									service_id:
										element.service_id === '' ? undefined : element.service_id,
									mile_number             : element.mile_number,
									origin_location_id      : element.origin,
									destination_location_id : element.destination,
									service_provider_id     : element.service_provider_id,
								},
							);
						});
					}
				});
			});

			return ltl_freight_vendor_mappings;
		}
		const data = {};
		Object.keys(values).forEach((key) => {
			if (NUMBER_KEYS.includes(key)) {
				data[key] = Number(values[key] || 0);
			} else {
				data[key] = values[key];
			}
		});

		const payload = {
			service      : task.shipment_type,
			service_data : [],
		};

		payload.service_data = task.task_field_ids.map((item) => ({
			service_id: item,
			data,
		}));

		return payload;
	}
	return values;
};
export default extraApiPayload;
