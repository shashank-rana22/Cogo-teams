import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import sales_reason_options from '../configs/sales-reason-options';
import {
	supply_cancellation_reasons,
	supply_sub_reasons,
} from '../configs/supply-reason-options';

const CANCEL_WHILE_EXPLORING_REASON = {
	label : 'I was just exploring',
	value : 'i_was_just_exploring',
};

const controls = (state, cancelReason) => {
	const SALES_OPTION_REASONS = state === 'shipment_received'
		? [...sales_reason_options, CANCEL_WHILE_EXPLORING_REASON]
		: [...sales_reason_options];
	const supplyOptionsState = state === 'in_progress' ? 'in_progress' : 'not_in_progress';

	return {
		sales: [
			{
				name      : 'cancellation_reason',
				label     : 'Please select a reason for cancelling the shipment',
				type      : 'radio',
				className : 'width_100',
				options   : SALES_OPTION_REASONS,
				rules     : {
					required: {
						value   : true,
						message : 'Cancellation reason is required',
					},
				},
			},
			{
				name  : 'cargo_ready_date',
				label : 'When will your cargo be ready (Enter date)?',
				type  : 'datepicker',
				rules : {
					required: 'Date is required',
				},
			},
			{
				name        : 'consignee_reason',
				label       : 'Reason for consignee cancellation',
				type        : 'text',
				placeholder : 'Type here...',
				rules       : {
					required: 'Reason for consignee cancellation is required',
				},
			},
			{
				name        : 'modification_detail',
				label       : 'Select Modification',
				type        : 'select',
				size        : 'sm',
				placeholder : 'Select Modification',
				options     : [
					{
						label : 'WANT TO CHANGE THE SCHEDULE',
						value : 'want_to_change_the_schedule',
					},
					{
						label : 'WANT TO CHANGE THE SERVICE PROVIDER',
						value : 'want_to_change_the_service_provider',
					},
				],
				rules: {
					required: true,
				},
			},
			{
				label:
					'Please share the cost difference, and shipping line (we’ll try to get a better rate next time)',
				name      : 'better_quotation_label',
				className : 'width_100',
			},
			{
				name        : 'better_quotation_currency',
				type        : 'select',
				size        : 'sm',
				placeholder : 'Select Currency',
				options     : [
					GLOBAL_CONSTANTS.currency_code.INR,
					GLOBAL_CONSTANTS.currency_code.USD,
					GLOBAL_CONSTANTS.currency_code.EUR,
					GLOBAL_CONSTANTS.currency_code.GBP,
				].map((currency) => ({
					label : currency,
					value : currency,
				})),
				rules: {
					required: 'Currency is required',
				},
			},
			{
				name        : 'better_quotation_value',
				type        : 'number',
				placeholder : 'Enter Value',
				size        : 'sm',
				rules       : {
					required : 'Value is required',
					min      : 0,
				},
			},
			{
				name        : 'better_quotation_shipping_line',
				type        : 'async_select',
				size        : 'sm',
				placeholder : 'Select Shipping Line',
				valueKey    : 'id',
				labelKey    : 'business_name',
				asyncKey    : 'shipping_lines',
				rules       : { required: 'Shipping Line is required' },
			},
			{
				name        : 'remarks',
				label       : 'Remarks',
				type        : 'text',
				size        : 'sm',
				placeholder : 'Type here...',
				rules       : {
					required: true,
				},
			},
			{
				name        : 'exploring_remark',
				label       : 'Is there anything specific we can help with?',
				type        : 'text',
				size        : 'sm',
				placeholder : 'Type here...',
				rules       : {
					required: 'Remarks is required',
				},
			},
		],

		supply: [
			{
				name      : 'cancellation_reason',
				label     : 'Please select a reason for cancelling the shipment',
				type      : 'radio',
				className : 'width_100',
				options   : supply_cancellation_reasons[supplyOptionsState],
				rules     : {
					required: 'Cancellation reason is required',
				},
			},
			{
				name        : 'cancellation_sub_reason',
				label       : 'Please select a sub-reason',
				type        : 'select',
				size        : 'sm',
				placeholder : 'Please select a reason',
				options     : supply_sub_reasons[cancelReason],
				rules       : {
					required: 'Sub-reason is required',
				},
			},
		],
	};
};

export default controls;
