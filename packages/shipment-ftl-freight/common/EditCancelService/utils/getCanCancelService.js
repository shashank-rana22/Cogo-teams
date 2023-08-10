const serviceCancellationStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

const SHOW_CANCELLATION_STAKEHOLDERS = [
	'superadmin',
	'service_ops',
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'prod_process owner',
];

export default function getCanCancelService({ state, activeStakeholder }) {
	const serviceInCancellationState = serviceCancellationStates.includes(state);

	const userCanCancel = SHOW_CANCELLATION_STAKEHOLDERS.includes(activeStakeholder);

	return serviceInCancellationState && userCanCancel;
}
