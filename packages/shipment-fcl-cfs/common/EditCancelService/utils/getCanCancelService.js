import GLOBAL_CONSTANTS from "@cogoport/globalization/constants/globals";

const serviceCancellationStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_CANCELLATION_STAKEHOLDERS = ['superadmin', 'booking_desk',
	'document_desk', 'costbooking_ops', 'booking_desk_manager'];

const serviceCompletedOrCancelled = ['completed', 'cancelled'];

export default function getCanCancelService({ shipment_data, user_data, state, activeStakeholder }) {
	if (user_data?.email === 'ajeet@cogoport.com') {
		return true;
	}
	if (shipment_data?.serial_id <= GLOBAL_CONSTANTS.others.old_shipment_serial_id && !serviceCompletedOrCancelled.includes(state)) {
		return true;
	}

	const userCanCancel = SHOW_CANCELLATION_STAKEHOLDERS.includes(activeStakeholder);
	const serviceInCancellationState = serviceCancellationStates.includes(state);

	return serviceInCancellationState && userCanCancel;
}
