const BETTER_OFFER_REASON = 'i_have_received_a_better_quotation/offer';

export default function getCancelShipmentPayload(formValues, id) {
	const submitData = {
		id,
		state               : 'cancelled',
		cancellation_reason : formValues.cancellation_reason,
	};
	if (
		submitData.cancellation_reason
		=== BETTER_OFFER_REASON
	) {
		submitData.cancellation_detail = {};
	}
	Object.keys(formValues).forEach((item) => {
		if (item !== 'cancellation_reason') {
			if (
				submitData.cancellation_reason
				=== BETTER_OFFER_REASON
			) {
				submitData.cancellation_detail[item] = formValues[item];
			} else {
				submitData.cancellation_subreason = formValues[item];
			}
		}
	});
	return submitData;
}
