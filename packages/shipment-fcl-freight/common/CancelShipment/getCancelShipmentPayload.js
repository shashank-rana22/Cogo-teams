export default function getCancelShipmentPayload(formValues, id) {
	const { cancellation_reason, remarks } = formValues || {};
	const submit_data = {
		cancellation_reason,
		...(cancellation_reason === 'i_have_received_a_better_quotation/offer'
			? {
				cancellation_detail : { remarks },
				state               : 'cancelled',
				id,

			} : {
				cancellation_subreason : remarks,
				state                  : 'cancelled',
				id,
			}),
	};

	return submit_data;
}
