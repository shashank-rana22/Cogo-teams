const SHIPMENT_CANCELLATION_STATES = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

const SHIPMENT_CANCELLATION_STAKEHOLDERS = [
	'superadmin',
	'admin',
	'booking_agent',
	'sales_agent',
	'booking_desk',
	'booking_desk_manager',
];

export default function getCanCancelShipment({ shipment_data, user_data, activeStakeholder }) {
	const { state } = shipment_data || {};

	const isShipmentInCancellationState = SHIPMENT_CANCELLATION_STATES.includes(state);

	const isStakeholderAllowed = SHIPMENT_CANCELLATION_STAKEHOLDERS.includes(activeStakeholder);

	const allowedEmail = user_data?.email === 'ajeet@cogoport.com';

	return isShipmentInCancellationState && (isStakeholderAllowed || allowedEmail);
}