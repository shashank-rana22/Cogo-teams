const extraApiPayload = (values, end_point, task, getApisData) => {
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
		if (task?.task === 'confirm_booking') {
			const payload = {
				service      : task.shipment_type,
				service_data : [],
			};

			payload.service_data = (task.task_field_ids || []).map((id) => ({
				service_id : id,
				data       : {
					cargo_readiness_date            : values?.cargo_readiness_date,
					destination_location_id         : values?.destination_location_id,
					destination_transportation_by   : values?.destination_transportation_by,
					mode_of_delivery_at_destination : values?.mode_of_delivery_at_destination,
					origin_location_id              : values?.origin_location_id,
					customer_payment_terms          : values?.customer_payment_terms,
					stuffing_point                  : values?.stuffing_point,
					source_transportation_by        : values?.source_transportation_by,

					consignor_details: {
						name_of_consignor    : values?.name_of_consignor,
						address_of_consignor : values?.address_of_consignor,
						contact_consignor    : values?.contact_consignor,
						tax_number           : values?.tax_number_consignor,
					},

					consignee_details: {
						name_of_consignee    : values?.name_of_consignee,
						address_of_consignee : values?.address_of_consignee,
						contact_consignee    : values?.contact_consignee,
						tax_number           : values?.tax_number_consignee,
					},
				},
			}));

			return payload;
		}

		if (task.task === 'upload_lorry_receipt'
		) {
			const payload = {
				service      : task.shipment_type,
				service_data : [],
			};

			getApisData.list_shipment_services.forEach((item) => {
				const eachTrailerPayload = {
					service_id : item.id,
					data       : {
						lr_number: [],
					},
				};

				values.documents.forEach((documentItem) => {
					if (documentItem.service_id === item.id) {
						eachTrailerPayload.data.lr_number.push(documentItem.lr_number);
					}
				});
				payload.service_data.push(eachTrailerPayload);
			});

			return payload;
		}

		if (
			task.task === 'upload_proof_of_delivery'
		) {
			const payload = {
				service      : task.shipment_type,
				service_data : [],
			};
			getApisData.list_shipment_services.forEach((item) => {
				const eachTruckPayload = {
					service_id : item.id,
					data       : {
						delivery_date: '',
					},
				};

				values.documents.forEach((documentItem) => {
					if (documentItem.service_id === item.id) {
						eachTruckPayload.data.delivery_date = documentItem.delivery_date;
					}
				});

				payload.service_data.push(eachTruckPayload);
			});

			return payload;
		}

		return values;
	}
	return values;
};
export default extraApiPayload;
