const NOT_ALLOWED_STAKEHOLDERS = ['booking_agent', 'ground_ops'];

export default function getEditServiceDetails({ state, activeStakeholder }) {
	const serviceInCancellationState = state !== 'completed';

	const disableEdit = NOT_ALLOWED_STAKEHOLDERS.includes(activeStakeholder);

	return serviceInCancellationState && !disableEdit;
}
