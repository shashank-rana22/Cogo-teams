import CONSTANTS from '../../../configs/constants.json';

const editSupplierServiceStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const serviceCompletedOrCancelled = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state, stakeholderConfig }) {
	if (user_data?.email === CONSTANTS.ajeet_email) {
		return true;
	}

	const isStakeholderAllowed = !!stakeholderConfig.edit_supplier;

	const serviceInEditSupplierState = editSupplierServiceStates?.includes(state);

	const oldShipmentEditable = shipment_data?.serial_id <= CONSTANTS.invoice_check_id
	&& !serviceCompletedOrCancelled.includes(state);

	return isStakeholderAllowed && (serviceInEditSupplierState || oldShipmentEditable);
}
