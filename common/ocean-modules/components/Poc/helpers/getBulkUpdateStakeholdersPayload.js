export default function getBulkUpdateStakeholdersPayload({
	addPoc = {}, shipment_id = '', formValues = {}, FIELD_ARRAY_KEY = '',
}) {
	const { stakeholder_type } = addPoc || {};

	const PAYLOAD = [];

	(formValues?.[FIELD_ARRAY_KEY] || []).forEach((formValue) => {
		const { is_checked, service_id, service_type, new_stakeholder } = formValue || {};

		if (is_checked) {
			PAYLOAD.push({
				shipment_id,
				stakeholder_type,
				service_id,
				service_type,
				stakeholder_id: new_stakeholder,
			});
		}
	});

	return PAYLOAD;
}
