export default function getEditServiceDetails({ state = '', stakeholderConfig = {}, isTruckPresent = false }) {
	const serviceInCancellationState = state !== 'completed';

	const enableEdit = stakeholderConfig?.overview?.edit_service_details || false;

	return serviceInCancellationState && enableEdit && isTruckPresent;
}
