const NOT_ALLOWED_STAKEHOLDERS = ['booking_desk', 'document_desk', 'ftl_ground_ops', 'field_service_ops'];

export default function getEnableConsolidation({ activeStakeholder, enableConsolidations }) {
	const disableEdit = NOT_ALLOWED_STAKEHOLDERS.includes(activeStakeholder);

	return enableConsolidations && !disableEdit;
}
