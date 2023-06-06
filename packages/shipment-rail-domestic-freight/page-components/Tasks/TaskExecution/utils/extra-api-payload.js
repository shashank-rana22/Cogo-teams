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

		if ([
			'upload_lorry_receipt',
			'upload_eway_bill_copy',
			'upload_commercial_invoice',
			'upload_iwb',
			'upload_proof_of_delivery',
		].includes(task.task)) {
			const payload = {
				service      : task.shipment_type,
				service_data : [],
			};

			const serviceMapping = {
				ftl_freight_service           : 'ftl_freight',
				haulage_freight_service       : 'haulage_freight',
				rail_domestic_freight_service : 'rail_domestic_freight',
			};
			const TaskKeyMapping = {
				upload_lorry_receipt      : 'lr_number',
				upload_eway_bill_copy     : 'eway_bill_number',
				upload_commercial_invoice : 'commercial_invoice_number',
				upload_iwb                : 'iwb_number',
				upload_proof_of_delivery  : 'delivery_date',
			};
			payload.service = task.service_type
				? serviceMapping[task.service_type]
				: task.shipment_type;

			let dataKey = TaskKeyMapping[task.task];
			let dataValue = values?.documents?.[0]?.[dataKey] || values[dataKey];
			if (
				task.service_type === 'ftl_freight_service'
				&& task.task === 'upload_lorry_receipt'
			) {
				dataKey = `${dataKey}s`;
				dataValue = [dataValue];
			}

			const eachServicePayload = {
				service_id: task.service_id
					? task?.service_id
					: task?.task_field_ids?.[0],
				data: {
					[dataKey]: dataValue,
				},
			};

			payload.service_data.push(eachServicePayload);

			return payload;
		}

		return values;
	}
	return values;
};
export default extraApiPayload;
