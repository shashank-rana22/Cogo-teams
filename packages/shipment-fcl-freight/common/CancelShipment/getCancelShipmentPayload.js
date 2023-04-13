export default function getCancelShipmentPayload(formValues) {
	const { cancellation_reason, remarks } = formValues || {};
	const submit_data = {
		cancellation_reason,
		...(cancellation_reason === 'i_have_received_a_better_quotation/offer'
			? {
				cancellation_detail: { remarks },
			} : {
				cancellation_subreason: remarks,
			}),
	};

	return submit_data;
}
