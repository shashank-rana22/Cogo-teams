const BETTER_OFFER_REASON = 'i_have_received_a_better_quotation/offer';

export default function getCancelShipmentPayload(formValues, id) {
	const { cancellation_reason, remarks } = formValues || {};

	const payload = {
		id,
		state: 'cancelled',
		cancellation_reason,
		...(cancellation_reason === BETTER_OFFER_REASON
			? { cancellation_detail: { remarks } } : { cancellation_subreason: remarks }),
	};

	return payload;
}
