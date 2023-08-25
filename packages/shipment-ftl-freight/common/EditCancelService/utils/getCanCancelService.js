const serviceCancellationStates = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

export default function getCanCancelService({ state = {}, stakeholderConfig = {} }) {
	const serviceInCancellationState = serviceCancellationStates.includes(state);

	const userCanCancel = stakeholderConfig?.overview?.cancel_service || false;

	return serviceInCancellationState && userCanCancel;
}
