import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const shipmentCancellationStates = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

const serviceCancellationStates = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
	'containers_gated_in',
	'cargo_carted_in',
	'container_departed',
	'cancelled',
];

export default function getCanCancelShipment({ shipment_data, primary_service, user_data, stakeholderConfig }) {
	const isShipmentInCancellationState = shipmentCancellationStates.includes(shipment_data?.state);

	const isServiceInCancellationState = serviceCancellationStates.includes(primary_service?.state);

	const isStakeholderAllowed = !!stakeholderConfig?.cancel_shipment?.can_cancel;

	const allowedEmail = user_data?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

	return isShipmentInCancellationState && isServiceInCancellationState && (isStakeholderAllowed || allowedEmail);
}
