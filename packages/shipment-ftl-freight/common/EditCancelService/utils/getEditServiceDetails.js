const NOT_ALLOWED_STAKEHOLDERS = ['booking_agent', 'ground_ops', 'ftl_ground_ops', 'field_service_ops'];

export default function getEditServiceDetails({ state, activeStakeholder, isTruckPresent }) {
	const serviceInCancellationState = state !== 'completed';

	const disableEdit = NOT_ALLOWED_STAKEHOLDERS.includes(activeStakeholder);

	return serviceInCancellationState && !disableEdit && isTruckPresent;
}
