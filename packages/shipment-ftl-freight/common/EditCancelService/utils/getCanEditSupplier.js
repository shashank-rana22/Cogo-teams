import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const EDIT_SUPPLIER_SERVICE_STATES = ['init',
	'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const serviceCompletedOrCancelled = ['completed', 'cancelled'];
const ALLOWED_USER_IDS = [GLOBAL_CONSTANTS.uuid.linh_nguyen_duy_user_id, GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id];

export default function getCanEditSupplier({
	shipment_data = {},
	user_data = {},
	state = '',
	stakeholderConfig = {},
}) {
	if (ALLOWED_USER_IDS.includes(user_data?.id)) {
		return true;
	}

	const userCanCancel = stakeholderConfig?.overview?.edit_supplier || false;

	const serviceInEditSupplierState = EDIT_SUPPLIER_SERVICE_STATES?.includes(state);

	const oldShipmentCancellable = shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& !serviceCompletedOrCancelled.includes(state);

	return userCanCancel && (serviceInEditSupplierState || oldShipmentCancellable);
}
