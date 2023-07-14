import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SHIPMENT_CANCELLATION_STATES = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

const SHIPMENT_CANCEL_STAKEHOLDERS = [
	'superadmin',
	'admin',
	'booking_agent',
	'sales_agent',
	'booking_desk',
	'booking_desk_manager',
	'so1_so2_ops',
];

const SERVICE_CANCELLATION_STATES = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
	'containers_gated_in',
	'cargo_carted_in',
	'container_departed',
	'cancelled',
];

export default function getCanCancelShipment({ shipment_data, primary_service, user_data, activeStakeholder }) {
	const { state } = shipment_data || {};

	const isShipmentInCancellationState = SHIPMENT_CANCELLATION_STATES.includes(state);

	const isServiceInCancellationState = SERVICE_CANCELLATION_STATES.includes(primary_service?.state);

	const isStakeholderAllowed = SHIPMENT_CANCEL_STAKEHOLDERS.includes(activeStakeholder);

	const allowedEmail = user_data?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

	return isShipmentInCancellationState && isServiceInCancellationState && (isStakeholderAllowed || allowedEmail);
}
