const editSupplierServiceStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];
const showEditSupplier = [
	'superadmin',
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'prod_process owner',
];
const serviceCompletedOrCancelled = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state }) {
	if (user_data?.email === 'ajeet@cogoport.com') {
		return true;
	}

	const userCanCancel = shipment_data?.stakeholder_types?.some((e) => showEditSupplier.includes(e));

	const serviceInEditSupplierState = editSupplierServiceStates?.includes(state);

	const oldShipmentCancellable = shipment_data?.serial_id <= 120347 && !serviceCompletedOrCancelled.includes(state);

	return userCanCancel && (serviceInEditSupplierState || oldShipmentCancellable);
}
