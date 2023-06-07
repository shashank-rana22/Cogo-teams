import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
	'so1_so2_ops',
];

export default function getCanCancelShipment({ shipment_data, user_data, activeStakeholder }) {
	const { state } = shipment_data || {};

	const isShipmentInCancellationState = shipmentCancellationStates.includes(state);

	const isStakeholderAllowed = shipmentCancelStakeholders.includes(activeStakeholder);

	const allowedEmail = user_data?.user?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

	return isShipmentInCancellationState && (isStakeholderAllowed || allowedEmail);
}
