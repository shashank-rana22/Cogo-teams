import { ENTITY_IDS_MAPPING } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const { ID } = GLOBAL_CONSTANTS.country_entity_ids;

const EDIT_SUPPLIER_SERVICE_STATES = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
];

const EDIT_SUPPLIER_SERVICE_STATES_COE_HEAD = [
	'init',
	'awaiting_service_provider_confirmation',
	'confirmed_by_service_provider',
];

const SHOW_EDIT_SUPPLIER_STAKEHOLDERS = [
	'superadmin',
	'booking_desk',
	'booking_desk_manager',
	'document_desk',
	'document_desk_manager',
	'costbooking_ops',
	'so1_so2_ops',
];

const SERVICE_COMPLETED_OR_CANCELLED = ['completed', 'cancelled'];

export default function getCanEditSupplier({ shipment_data, user_data, state, activeStakeholder, role_ids = [] }) {
	if (user_data?.id
		&& ([GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id, GLOBAL_CONSTANTS.uuid.linh_nguyen_duy_user_id]
			.includes(user_data?.id)
			|| (role_ids.includes(ENTITY_IDS_MAPPING[ID]?.uuid?.coe_head)
				&& EDIT_SUPPLIER_SERVICE_STATES_COE_HEAD?.includes(state)))) {
		return true;
	}

	const isStakeholderAllowed = SHOW_EDIT_SUPPLIER_STAKEHOLDERS.includes(activeStakeholder);

	const serviceInEditSupplierState = EDIT_SUPPLIER_SERVICE_STATES?.includes(state);

	const oldShipmentEditable = shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
	&& !SERVICE_COMPLETED_OR_CANCELLED.includes(state);

	return isStakeholderAllowed && (serviceInEditSupplierState || oldShipmentEditable);
}
