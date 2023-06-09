const serviceCancellationStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

export default function getCanCancelService({ state, stakeholderConfig }) {
	const serviceInCancellationState = serviceCancellationStates.includes(state);

	const userCanCancel = !!stakeholderConfig.cancel_service;

	return serviceInCancellationState && userCanCancel;
}
