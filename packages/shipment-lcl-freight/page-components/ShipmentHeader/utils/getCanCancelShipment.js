import CONSTANTS from '../../../configs/constants.json';

const shipmentCancellationStates = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

export default function getCanCancelShipment({ shipment_data, user_data, stakeholderConfig }) {
	const isShipmentInCancellationState = shipmentCancellationStates.includes(shipment_data?.state);

	const isStakeholderAllowed = !!stakeholderConfig?.cancel_shipment?.can_cancel;

	const allowedEmail = user_data?.email === CONSTANTS.ajeet_email;

	return isShipmentInCancellationState && (isStakeholderAllowed || allowedEmail);
}
