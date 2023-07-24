const BETTER_OFFER_REASON = 'i_have_received_a_better_quotation/offer';

export default function getCancelShipmentPayload(formValues, id) {
	const submit_data = {
		id,
		state               : 'cancelled',
		cancellation_reason : formValues.cancellation_reason,
	};
	if (
		submit_data.cancellation_reason
		=== BETTER_OFFER_REASON
	) {
		submit_data.cancellation_detail = {};
	}
	Object.keys(formValues).forEach((item) => {
		if (item !== 'cancellation_reason') {
			if (
				submit_data.cancellation_reason
				=== BETTER_OFFER_REASON
			) {
				submit_data.cancellation_detail[item] = formValues[item];
			} else {
				submit_data.cancellation_subreason = formValues[item];
			}
		}
	});
	return submit_data;
}
