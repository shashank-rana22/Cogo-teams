const serviceCancellationStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const showCancellationStakeholders = ['superadmin', 'booking_desk', 'document_desk', 'costbooking_ops'];

const serviceCompletedOrCancelled = ['completed', 'cancelled'];

export default function getCanCancelService({ shipment_data, user_data, state, activeStakeholder }) {
	if (user_data?.email === 'ajeet@cogoport.com') {
		return true;
	}
	if (shipment_data?.serial_id <= 120347 && !serviceCompletedOrCancelled.includes(state)) {
		return true;
	}

	const userCanCancel = showCancellationStakeholders.includes(activeStakeholder);
	const serviceInCancellationState = serviceCancellationStates.includes(state);

	return serviceInCancellationState && userCanCancel;
}
