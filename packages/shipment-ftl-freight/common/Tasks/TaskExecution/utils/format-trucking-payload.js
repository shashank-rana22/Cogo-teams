const TASK_KEYS = {
	upload_service_provider_proof_of_delivery: {
		data_key      : 'physical_pod_location_id',
		accessor_key  : 'physical_pod_location_id',
		default_value : '',
	},
	pod_sent_to_shipper: {
		data_key      : 'courier_tracking_number',
		accessor_key  : 'courier_tracking_number',
		default_value : '',
	},
};

const formatTruckingPayload = (
	task = {},
	rawValues = {},
	getApisData = {},
) => {
	const payload = {
		service      : task.shipment_type,
		service_data : [],
	};

	if (task.task === 'confirmation_on_services_taken') {
		let total_truck_count = 0;

		getApisData?.list_shipment_services?.forEach((item) => {
			total_truck_count += item.trucks_count;
		});

		getApisData?.list_shipment_services?.forEach((item) => {
			const check = ['cargo_per_package', 'cargo_gross'].includes(
				item.load_selection_type,
			);
			payload.service_data.push({
				service_id : item.id,
				data       : {
					volume         : check ? item.volume : rawValues.volume / total_truck_count,
					weight         : check ? item.weight : rawValues.weight / total_truck_count,
					packages_count : check
						? item.packages_count
						: rawValues.packages_count / total_truck_count,
					pickup_address        : rawValues.pickup_address,
					delivery_address      : rawValues.delivery_address,
					invoice_approval_type : rawValues.invoice_approval_type,
					commodity_description : rawValues.commodity_description,
					trip_number           : rawValues?.trip_number,
				},
			});
		});
	}

	if (task.task === 'mark_completed' && task.state === 'cargo_dropped') {
		getApisData.list_shipment_services.forEach((item) => {
			const eachTruckPayload = {
				service_id : item.id,
				data       : {
					delivery_date: '',
				},
			};

			rawValues.documents.forEach((documentItem) => {
				if (documentItem?.service_id === item?.id) {
					eachTruckPayload.data.delivery_date = documentItem?.delivery_date;
				}
			});

			payload.service_data.push(eachTruckPayload);
		});
	}

	if (task.task === 'upload_lorry_receipt') {
		getApisData.list_shipment_services.forEach((item) => {
			const eachTruckPayload = {
				service_id : item.id,
				data       : {
					lr_numbers: [],
				},
			};
			rawValues.documents.forEach((documentItem) => {
				if (documentItem.service_id === item.id) {
					eachTruckPayload.data.lr_numbers.push(documentItem.lr_number);
					eachTruckPayload.data.lr_date = documentItem?.lr_date;
				}
			});
			payload.service_data.push(eachTruckPayload);
		});
	}

	if (task.task === 'upload_ftl_commercial_invoice') {
		getApisData.list_shipment_services.forEach((item) => {
			const eachTruckPayload = {
				service_id : item.id,
				data       : {
					commercial_invoice_number : '',
					commercial_invoice_date   : '',
				},
			};

			rawValues.documents.forEach((documentItem) => {
				if (documentItem.service_id === item.id) {
					eachTruckPayload.data.commercial_invoice_number = documentItem.invoiceNumber;
					eachTruckPayload.data.commercial_invoice_date =	documentItem.invoiceDate;
				}
			});

			payload.service_data.push(eachTruckPayload);
		});
	}

	if (task?.task === 'upload_ftl_eway_bill_copy') {
		getApisData.list_shipment_services.forEach((item) => {
			const eachTruckPayload = {
				service_id : item.id,
				data       : {
					eway_bill_details: [],
				},
			};

			rawValues.documents.forEach((documentItem) => {
				if (documentItem.truck_number === item.id) {
					eachTruckPayload.data.eway_bill_details.push({
						eway_bill_number : documentItem?.eway_bill_number,
						ewb_validity     : documentItem?.ewb_validity,
						remarks          : documentItem?.description,
					});
				}
			});

			payload.service_data.push(eachTruckPayload);
		});
	}

	if (task?.task === 'upload_invoice_submission_acknowledgement') {
		getApisData?.list_shipment_services?.forEach((serviceItem) => {
			const eachServicePayload = {
				service_id : serviceItem?.id,
				data       : {
					invoice_submission_details: [],
				},
			};

			rawValues?.documents?.forEach((documentItem) => {
				if (documentItem?.service_id === serviceItem?.id) {
					eachServicePayload.data.invoice_submission_details.push({
						invoice_submission_date: documentItem?.invoice_submission_date,
					});
				}
			});

			payload.service_data.push(eachServicePayload);
		});
	}

	if (task?.task in TASK_KEYS) {
		const taskObj = TASK_KEYS[task?.task];
		getApisData?.list_shipment_services?.forEach((serviceItem) => {
			const eachServicePayload = {
				service_id : serviceItem?.id,
				data       : {
					[taskObj.data_key]: taskObj.default_value,
				},
			};

			rawValues.documents.forEach((documentItem) => {
				if (documentItem?.service_id === serviceItem?.id) {
					eachServicePayload.data[taskObj.data_key] = documentItem[taskObj.accessor_key];
				}
			});

			payload.service_data.push(eachServicePayload);
		});
	}

	return payload;
};
export default formatTruckingPayload;
