import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const { vinod_talapa_user_id } = GLOBAL_CONSTANTS.uuid;

const shipmentCancellationStates = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

const serviceCancellationStates = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
	'cancelled',
];

export default function getCanCancelShipment({ shipment_data, primary_service, user_data, stakeholderConfig }) {
	const isShipmentInCancellationState = shipmentCancellationStates.includes(shipment_data?.state);

	const isServiceInCancellationState = serviceCancellationStates.includes(primary_service?.state);

	const isStakeholderAllowed = !!stakeholderConfig?.cancel_shipment?.can_cancel;

	const allowedId = user_data?.id === vinod_talapa_user_id;

	return isShipmentInCancellationState && isServiceInCancellationState && (isStakeholderAllowed || allowedId);
}
