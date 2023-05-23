import CONSTANTS from '../../../configurations/contants.json';

const editSupplierServiceStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_EDIT_SUPPLIER_STAKEHOLDERS = [
	'superadmin',
	'booking_desk',
	'booking_desk_manager',
	'document_desk',
	'document_desk_manager',
	'costbooking_ops',
];

const serviceCompletedOrCancelled = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state, activeStakeholder }) {
	if (user_data?.email === CONSTANTS.ajeet_email) {
		return true;
	}

	const userCanCancel = SHOW_EDIT_SUPPLIER_STAKEHOLDERS.includes(activeStakeholder);

	const serviceInEditSupplierState = editSupplierServiceStates?.includes(state);

	const oldShipmentCancellable = shipment_data?.serial_id <= 120347 && !serviceCompletedOrCancelled.includes(state);

	return userCanCancel && (serviceInEditSupplierState || oldShipmentCancellable);
}
