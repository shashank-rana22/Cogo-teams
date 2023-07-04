const SERVICE_CANCEL_STATES = ['init', 'awaiting_service_provider_confirmation', 'confirmed_by_service_provider'];

export default function getCanCancelService({ state, stakeholderConfig }) {
	const serviceInCancellationState = SERVICE_CANCEL_STATES.includes(state);

	const userCanCancel = !!stakeholderConfig.cancel_service;

	return serviceInCancellationState && userCanCancel;
}
