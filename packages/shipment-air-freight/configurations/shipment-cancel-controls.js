import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import SALES_REASON_OPTIONS from './sales-reason-options';
import {
	SUPPLY_CANCELLATION_REASONS,
	SUPPLY_SUB_REASONS,
} from './supply-reason-options';

const SALES_OPTION_START_POINT = 0;
const SHIPMENT_RECEIVED_LIMIT = 6;
const SHIPMENT_NOT_RECEIVED_LIMIT = 5;

const controls = (state, cancelReason) => {
	const salesOptionLimit = state === 'shipment_received' ? SHIPMENT_RECEIVED_LIMIT : SHIPMENT_NOT_RECEIVED_LIMIT;
	const supplyOptionsState = state === 'in_progress' ? 'in_progress' : 'not_in_progress';

	return {
		sales: [
			{
				name      : 'cancellation_reason',
				label     : 'Please select a reason for cancelling the shipment',
				type      : 'radio',
				className : 'width_100',
				options   : SALES_REASON_OPTIONS.slice(SALES_OPTION_START_POINT, salesOptionLimit),
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
				placeholder : 'Select Airline',
				valueKey    : 'id',
				labelKey    : 'business_name',
				asyncKey    : 'list_operators',
				rules       : { required: 'Airline is required' },
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
				options   : SUPPLY_CANCELLATION_REASONS[supplyOptionsState],
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
				options     : SUPPLY_SUB_REASONS[cancelReason],
				rules       : {
					required: 'Sub-reason is required',
				},
			},
		],
	};
};

export default controls;
