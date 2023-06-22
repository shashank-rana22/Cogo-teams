import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const EDIT_SUPPLIER_SERVICE_STATES = ['init',
	'awaiting_service_provider_confirmation'];

const SERVICE_COMPLETED_OR_CANCELLED = ['completed', 'cancelled'];

const OLD_SHIPMENT_ID = 120347;

export default function getCanEditSupplier({ shipment_data, user_data, state, stakeholderConfig }) {
	if (user_data?.id === GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id) {
		return true;
	}

	const isStakeholderAllowed = !!stakeholderConfig.edit_supplier;

	const serviceInEditSupplierState = EDIT_SUPPLIER_SERVICE_STATES?.includes(state);

	const oldShipmentEditable = shipment_data?.serial_id <= OLD_SHIPMENT_ID
										&& !SERVICE_COMPLETED_OR_CANCELLED.includes(state);

	return isStakeholderAllowed && (serviceInEditSupplierState || oldShipmentEditable);
}
