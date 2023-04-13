const shipmentCancellationStates = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

const shipmentCancelStakeholders = [
	'booking_agent',
	'service_ops1',
	'user',
];

export default function getCanCancelShipment({ shipment_data, user_data, activeStakeholder }) {
	const { state } = shipment_data || {};

	const isShipmentInCancellationState = shipmentCancellationStates.includes(state);

	const isStakeholderAllowed = shipmentCancelStakeholders.includes(activeStakeholder);

	const allowedEmail = user_data?.email === 'ajeet@cogoport.com';

	return isShipmentInCancellationState && (isStakeholderAllowed || allowedEmail);
}
