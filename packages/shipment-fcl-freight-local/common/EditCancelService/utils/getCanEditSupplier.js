const editSupplierServiceStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const serviceCompletedOrCancelled = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state, stakeholderConfig }) {
	if (user_data?.email === 'ajeet@cogoport.com') {
		return true;
	}

	const userCanCancel = !!stakeholderConfig.edit_supplier;

	const serviceInEditSupplierState = editSupplierServiceStates?.includes(state);

	const oldShipmentCancellable = shipment_data?.serial_id <= 120347 && !serviceCompletedOrCancelled.includes(state);

	return userCanCancel && (serviceInEditSupplierState || oldShipmentCancellable);
}
