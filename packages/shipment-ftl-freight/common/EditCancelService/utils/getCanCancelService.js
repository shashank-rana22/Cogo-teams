const serviceCancellationStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_CANCELLATION_STAKEHOLDERS = [
	'superadmin',
	'admin',
	'service_ops',
	'booking_desk',
	'document_desk',
	'service_ops3',
	'prod_process_owner',
];

export default function getCanCancelService({ state, activeStakeholder }) {
	const serviceInCancellationState = serviceCancellationStates.includes(state);

	const userCanCancel = SHOW_CANCELLATION_STAKEHOLDERS.includes(activeStakeholder);

	return serviceInCancellationState && userCanCancel;
}
