import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const EDIT_SUPPLIER_SERVICE_STATES = ['init',
	'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const EXCLUDED_SERVICE_STATES = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state, stakeholderConfig }) {
	if (user_data?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id) {
		return true;
	}

	const isStakeholderAllowed = !!stakeholderConfig.edit_supplier;

	const serviceInEditSupplierState = EDIT_SUPPLIER_SERVICE_STATES?.includes(state);

	const oldShipmentEditable = shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& !EXCLUDED_SERVICE_STATES.includes(state);

	return isStakeholderAllowed && (serviceInEditSupplierState || oldShipmentEditable);
}
