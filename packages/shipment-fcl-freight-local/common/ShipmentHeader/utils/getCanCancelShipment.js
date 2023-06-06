const SHIPMENT_CANCELLATION_STATES = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

export default function getCanCancelShipment({ shipment_data, user_data, stakeholderConfig }) {
	const { cancel_shipment : { can_cancel = false } = {} } = stakeholderConfig || {};
	const { state } = shipment_data || {};

	const isShipmentInCancellationState = SHIPMENT_CANCELLATION_STATES.includes(state);

	const allowedEmail = user_data?.email === 'ajeet@cogoport.com';

	return isShipmentInCancellationState && (can_cancel || allowedEmail);
}
