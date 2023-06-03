const SUB_REASON_SHOW = [
	'space_unavailable',
	'rates_do_not_match',
	'shipping_line_rejected_the_service',
	'profitability_issue',
	'rates_not_available',
	'preferred_line_not_avilable',
];

const getShowElements = (formValues) => {
	const showElements = {};

	showElements.cancellation_reason = true;

	showElements.cargo_ready_date = formValues.cancellation_reason === 'my_cargo_is_delayed';

	showElements.consignee_reason = formValues.cancellation_reason === 'cancelled_by_the_consignee';

	showElements.better_quotation_label = formValues.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer';

	showElements.better_quotation_currency = formValues.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer';
	showElements.better_quotation_value = formValues.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer';
	showElements.better_quotation_shipping_line = formValues.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer';

	showElements.modification_detail = formValues.cancellation_reason === 'i_want_to_modify_my_booking';

	showElements.remarks = [
		'customer_unreachable',
		'shipment_parameters_changed',
	].includes(formValues.cancellation_reason);

	showElements.exploring_remark = formValues.cancellation_reason === 'i_was_just_exploring';

	showElements.cancellation_sub_reason = SUB_REASON_SHOW.includes(
		formValues.cancellation_reason,
	);

	return showElements;
};

export default getShowElements;
