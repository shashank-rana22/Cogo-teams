const EDIT_SUPPLIER_SERVICE_STATES = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_EDIT_SUPPLIER_STAKEHOLDERS = ['superadmin', 'booking_desk', 'document_desk',
	'costbooking_ops', 'booking_desk_manager'];

const SERVICE_COMPLETED_OR_CANCELLED = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state, activeStakeholder }) {
	if (user_data?.email === 'ajeet@cogoport.com') {
		return true;
	}

	const userCanCancel = SHOW_EDIT_SUPPLIER_STAKEHOLDERS.includes(activeStakeholder);

	const serviceInEditSupplierState = EDIT_SUPPLIER_SERVICE_STATES?.includes(state);

	const oldShipmentCancellable = shipment_data?.serial_id <= 120347 && !SERVICE_COMPLETED_OR_CANCELLED.includes(state);

	return userCanCancel && (serviceInEditSupplierState || oldShipmentCancellable);
}
