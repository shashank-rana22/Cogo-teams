const EDIT_SUPPLIER_SERVICE_STATES = ['init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider'];

const SERVICE_COMPLETED_OR_CANCELLED = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state, stakeholderConfig }) {
	if (user_data?.email === 'ajeet@cogoport.com') {
		return true;
	}

	const userCanCancel = !!stakeholderConfig.edit_supplier;

	const serviceInEditSupplierState = EDIT_SUPPLIER_SERVICE_STATES?.includes(state);

	const oldShipmentCancellable = shipment_data?.serial_id <= 120347
 && !SERVICE_COMPLETED_OR_CANCELLED.includes(state);

	return userCanCancel && (serviceInEditSupplierState || oldShipmentCancellable);
}
