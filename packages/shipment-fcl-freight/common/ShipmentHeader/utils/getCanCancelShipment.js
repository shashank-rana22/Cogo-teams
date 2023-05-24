const shipmentCancellationStates = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

const shipmentCancelStakeholders = [
	'superadmin',
	'admin',
	'booking_agent',
	'sales_agent',
	'booking_desk',
	'booking_desk_manager',
];

export default function getCanCancelShipment({ shipment_data, user_data, activeStakeholder }) {
	const { state } = shipment_data || {};

	const isShipmentInCancellationState = shipmentCancellationStates.includes(state);

	const isStakeholderAllowed = shipmentCancelStakeholders.includes(activeStakeholder);

	const allowedEmail = user_data?.email === 'ajeet@cogoport.com';

	return isShipmentInCancellationState && (isStakeholderAllowed || allowedEmail);
}
