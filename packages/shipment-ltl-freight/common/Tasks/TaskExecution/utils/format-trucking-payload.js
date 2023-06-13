const formatTruckingPayload = (
	task = {},
	rawValues = {},
	getApisData = {},
) => {
	const payload = {
		service      : task.shipment_type,
		service_data : [],
	};

	if (task.task === 'upload_lorry_receipt') {
		(getApisData.list_shipment_services || []).forEach((item) => {
			payload.service_data.push({
				service_id : item.id,
				data       : {
					lr_number: rawValues.documents[0].lr_number,
				},
			});
		});
	}

	if (task.task === 'upload_proof_of_delivery') {
		(getApisData.list_shipment_services || []).forEach((item) => {
			payload.service_data.push({
				service_id : item.id,
				data       : {
					delivery_date: rawValues.documents[0].delivery_date,
				},
			});
		});
	}

	return payload;
};
export default formatTruckingPayload;
