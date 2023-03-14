const markTasksName = [
	'update_cargo_picked_up_at',
	'update_cargo_arrived_at_origin_cfs',
	'update_manifest_filed_at',
	'update_ams_filed_at',
	'update_delivery_order_posted_at',
	'release_bill_of_lading',
	'update_carrier_booking_reference_number',
	'booking_placed_with_carrier',
	'mark_cargo_carted_in',
	'mark_cargo_stuffed',
	'mark_cargo_handed_over',
	'mark_flight_departed',
	'mark_flight_arrived',
	'mark_cargo_handed_over_at_origin',
	'mark_vessel_departure_status',
	'mark_cargo_handed_over_status',
	'mark_vessel_arrival_status',
	'mark_cargo_handed_over_at_destination',
	'update_airway_bill_filed_at',
	'update_airway_bill_number',
	'update_console_points',
	'update_free_days_detention_at_origin',
	'update_free_days_demurrage_at_destination',
];

const differentDocs = [
	'upload_booking_note',
	'upload_delivery_order',
	'upload_carting_order',
	'upload_measurement_slip',
	'upload_airway_bill',
	'upload_destination_required_documents',
	'upload_bill_of_lading',
	'upload_draft_bill_of_lading',
	'upload_draft_airway_bill',
	'upload_container_arrival_notice',
	'upload_manifest_copy',
];

const markConfirmedSupplerConfigTasks = [
	'mark_confirmed',
	'mark_customs_cleared',
	'mark_completed',
];

const middleFunction1 = (pendingTask, shipment_data) => {
	const { id, similar_type_services } = shipment_data || {};

	let data_from_api = [
		{
			key_from_api: [id, ...Object.keys(similar_type_services || {})],
			key_to_send: 'ids',
		},
	];

	if (pendingTask?.task === 'update_carrier_booking_reference_number') {
		data_from_api = [
			...data_from_api,
			{ key: pendingTask?.service_type, value: 'service_type' },
		];
	}
	return data_from_api;
};

const dataFromApi = (pendingTask, shipment_data) => {
	if (markTasksName.includes(pendingTask?.task)) {
		return middleFunction1(pendingTask, shipment_data);
	}
	if (
		pendingTask.taskType === 'upload_document' &&
		!differentDocs.includes(pendingTask?.task)
	) {
		return [
			{ key_from_api: pendingTask.document_type, key_to_send: 'document_type' },
		];
	}
	if (markConfirmedSupplerConfigTasks.includes(pendingTask.task)) {
		const getState = (title, type) => {
			if (type === null)
				return { key_from_api: 'completed', key_to_send: 'state' };
			if (title === 'mark_completed')
				return { key_from_api: { state: 'completed' }, key_to_send: 'data' };
			if (title === 'mark_customs_cleared')
				return {
					key_from_api: { state: 'customs_cleared' },
					key_to_send: 'data',
				};
			return {
				key_from_api: { state: 'confirmed_by_service_provider' },
				key_to_send: 'data',
			};
		};
		const getIdObject = (type, data) => {
			if (type === null) {
				return {
					key_from_api: 'shipment_id',
					key_to_send: 'id',
					alternative: 'undefined',
				};
			}
			return { key_from_api: [data?.service_id], key_to_send: 'ids' };
		};
		return [
			getIdObject(pendingTask.service_type, pendingTask),
			getState(pendingTask.task, pendingTask.service_type),
			{ key_from_api: pendingTask.service_type, key_to_send: 'service_type' },
		];
	}
	return [];
};

export default dataFromApi;
