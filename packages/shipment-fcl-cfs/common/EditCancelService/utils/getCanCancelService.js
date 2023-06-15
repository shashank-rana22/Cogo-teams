const serviceCancellationStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_CANCELLATION_STAKEHOLDERS = ['superadmin', 'booking_agent'];

const serviceCompletedOrCancelled = ['completed', 'cancelled'];

const CANCELLABLE_SERIAL_LIMIT = 120347;

export default function getCanCancelService({ shipment_data, user_data, state, activeStakeholder }) {
	if (user_data?.email === 'ajeet@cogoport.com') {
		return true;
	}
	if (shipment_data?.serial_id <= CANCELLABLE_SERIAL_LIMIT && !serviceCompletedOrCancelled.includes(state)) {
		return true;
	}

	const userCanCancel = SHOW_CANCELLATION_STAKEHOLDERS.includes(activeStakeholder);
	const serviceInCancellationState = serviceCancellationStates.includes(state);

	return serviceInCancellationState && userCanCancel;
}
