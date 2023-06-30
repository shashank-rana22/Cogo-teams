import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SERVICE_CANCELLATION_STATES = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_CANCELLATION_STAKEHOLDERS = ['superadmin', 'booking_agent'];

const EXCLUDED_SERVICE_STATES = ['completed', 'cancelled'];

export default function getCanCancelService({ shipment_data, user_data, state, activeStakeholder }) {
	if (user_data?.id === GLOBAL_CONSTANTS.uuid.ajeet_singh_user_id) {
		return true;
	}
	if (shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id
		&& !EXCLUDED_SERVICE_STATES.includes(state)) {
		return true;
	}

	const userCanCancel = SHOW_CANCELLATION_STAKEHOLDERS.includes(activeStakeholder);
	const serviceInCancellationState = SERVICE_CANCELLATION_STATES.includes(state);

	return serviceInCancellationState && userCanCancel;
}
