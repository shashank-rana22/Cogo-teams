export default function getCancelShipmentPayload(formValues, id) {
	const { cancellation_reason, ...restFormValues } = formValues;

	const formData = { cancellation_reason };

	if (
		formData.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer'
	) {
		formData.cancellation_detail = {};
	}

	Object.entries(restFormValues).forEach(([key, value]) => {
		if (
			formData.cancellation_reason
			=== 'i_have_received_a_better_quotation/offer'
		) {
			formData.cancellation_detail[key] = value;
		} else if (
			['truck_type_changed', 'cargo_weight_changed']?.includes(
				formData.cancellation_reason,
			)
		) {
			formData.mapped_sid = { serial_id: value };
		} else {
			formData.cancellation_subreason = value;
		}
	});

	const payload = {
		id,
		state: 'cancelled',
		...formData,
	};

	return payload;
}
