const diffDocuments = [
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

const formatValues = (task = {}, data = {}, ctrl = {}) => {
	const taskName = task.task;

	let value;
	if (taskName === 'upload_draft_bill_of_lading') {
		value = [
			{
				description: '',
				document_number: '',
				containers_count: 1,
				url: '',
			},
		];
	}
	if (
		task.task_type === 'upload_document' &&
		!diffDocuments.includes(task.task)
	) {
		value = [
			{
				description: '',
				url: '',
			},
		];
	} else {
		value = data?.[ctrl.name];
	}

	return value;
};

export default formatValues;
