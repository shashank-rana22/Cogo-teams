import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SHIPMENT_CANCELLATION_STATES = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

const SERVICE_CANCELLATION_STATES = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
	'container_departed',
	'move_to_confirmed_by_service_provider',
	'cancelled',
];

export default function getCanCancelShipment({ shipment_data, primary_service, user_data, stakeholderConfig }) {
	const isShipmentInCancellationState = SHIPMENT_CANCELLATION_STATES.includes(shipment_data?.state);

	const isServiceInCancellationState = SERVICE_CANCELLATION_STATES.includes(primary_service?.state);

	const isStakeholderAllowed = !!stakeholderConfig?.cancel_shipment?.can_cancel;

	const allowedUser = user_data?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

	return isShipmentInCancellationState && isServiceInCancellationState && (isStakeholderAllowed || allowedUser);
}
