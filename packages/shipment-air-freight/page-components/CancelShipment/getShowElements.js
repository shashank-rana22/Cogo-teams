const SUB_REASON_SHOW = [
	'space_unavailable',
	'rates_do_not_match',
	'shipping_line_rejected_the_service',
	'profitability_issue',
	'rates_not_available',
	'preferred_line_not_avilable',
];

const getShowElements = (formValues) => {
	const SHOW_ELEMENTS = {};

	SHOW_ELEMENTS.cancellation_reason = true;

	SHOW_ELEMENTS.cargo_ready_date = formValues.cancellation_reason === 'my_cargo_is_delayed';

	SHOW_ELEMENTS.consignee_reason = formValues.cancellation_reason === 'cancelled_by_the_consignee';

	SHOW_ELEMENTS.better_quotation_label = formValues.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer';

	SHOW_ELEMENTS.better_quotation_currency = formValues.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer';
	SHOW_ELEMENTS.better_quotation_value = formValues.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer';
	SHOW_ELEMENTS.better_quotation_shipping_line = formValues.cancellation_reason
		=== 'i_have_received_a_better_quotation/offer';

	SHOW_ELEMENTS.modification_detail = formValues.cancellation_reason === 'i_want_to_modify_my_booking';

	SHOW_ELEMENTS.remarks = [
		'customer_unreachable',
		'shipment_parameters_changed',
		'contracted_fleet_unavailable',
		'truck_type_changed',
		'cargo_weight_changed',
	].includes(formValues.cancellation_reason);

	SHOW_ELEMENTS.exploring_remark = formValues.cancellation_reason === 'i_was_just_exploring';

	SHOW_ELEMENTS.cancellation_sub_reason = SUB_REASON_SHOW.includes(
		formValues.cancellation_reason,
	);

	return SHOW_ELEMENTS;
};

export default getShowElements;
