export default function getCancelShipmentPayload(formValues, id) {
	const { cancellation_reason, remarks } = formValues || {};

	const payload = {
		id,
		state: 'cancelled',
		cancellation_reason,
		...(cancellation_reason === 'i_have_received_a_better_quotation/offer'
			? {
				cancellation_detail: { remarks },

			} : {
				cancellation_subreason: remarks,
			}),
	};

	return payload;
}
