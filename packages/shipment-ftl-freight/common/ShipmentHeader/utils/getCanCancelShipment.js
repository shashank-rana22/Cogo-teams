import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SHIPMENT_CANCELLATION_STATES = [
	'shipment_received',
	'confirmed_by_importer_exporter',
	'in_progress',
];

const STAKEHOLDERS = [
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

	const isShipmentInCancellationState = SHIPMENT_CANCELLATION_STATES.includes(state);

	const isStakeholderAllowed = STAKEHOLDERS.includes(activeStakeholder);

	const allowedUser = user_data?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id;

	return isShipmentInCancellationState && (isStakeholderAllowed || allowedUser);
}
