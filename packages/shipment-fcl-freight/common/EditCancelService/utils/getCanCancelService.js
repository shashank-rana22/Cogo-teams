const serviceCancellationStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_CANCELLATION_STAKEHOLDERS = [
	'superadmin',
	'booking_desk',
	'booking_desk_manager',
	'document_desk',
	'document_desk_manager',
	'costbooking_ops',
];

export default function getCanCancelService({ state, activeStakeholder }) {
	const serviceInCancellationState = serviceCancellationStates.includes(state);

	const userCanCancel = SHOW_CANCELLATION_STAKEHOLDERS.includes(activeStakeholder);

	return serviceInCancellationState && userCanCancel;
}
