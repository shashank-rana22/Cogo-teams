import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const EDIT_SUPPLIER_SERVICE_STATES = ['init',
	'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_EDIT_SUPPLIER_STAKEHOLDERS = [
	'superadmin',
	'booking_desk',
	'booking_desk_manager',
	'document_desk',
	'document_desk_manager',
	'costbooking_ops',
	'so1_so2_ops',
];

const serviceCompletedOrCancelled = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state, activeStakeholder }) {
	if (user_data?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id) {
		return true;
	}

	const userCanCancel = SHOW_EDIT_SUPPLIER_STAKEHOLDERS.includes(activeStakeholder);

	const serviceInEditSupplierState = EDIT_SUPPLIER_SERVICE_STATES?.includes(state);

	const oldShipmentCancellable = shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& !serviceCompletedOrCancelled.includes(state);

	return userCanCancel && (serviceInEditSupplierState || oldShipmentCancellable);
}
