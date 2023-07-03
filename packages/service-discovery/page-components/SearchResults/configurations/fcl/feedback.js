import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const SHIPPING_LINE_PARAMS = {
	filters    : { operator_type: 'shipping_line', status: 'active' },
	page_limit : 100,
	sort_by    : 'short_name',
	sort_type  : 'asc',
};

const fclFeedBackControls = [
	{
		name    : 'feedbacks',
		type    : 'checkbox-group',
		label   : '',
		options : [
			{
				label : 'Rate not satisfactory',
				value : 'unsatisfactory_rate',
			},
			{
				label : 'Destination detention not satisfactory',
				value : 'unsatisfactory_destination_detention',
			},
			{
				label : 'Unpreferred Shipping Line',
				value : 'unpreferred_shipping_lines',
			},
		],
		rules: { required: 'This is Required' },
	},
	{
		name        : 'preferred_freight_rate_currency',
		label       : 'Currency',
		type        : 'select',
		placeholder : ' ',
		span        : 2,
		options     : [
			GLOBAL_CONSTANTS.currency_code.USD,
			GLOBAL_CONSTANTS.currency_code.INR,
			GLOBAL_CONSTANTS.currency_code.EUR,
			GLOBAL_CONSTANTS.currency_code.GBP,
			GLOBAL_CONSTANTS.currency_code.VND,
		].map((currencyCode) => ({
			label : currencyCode,
			value : currencyCode,
		})),
	},
	{
		name  : 'preferred_freight_rate',
		label : 'Indicative Rate',
		type  : 'number',
		span  : 9,
	},
	{
		name           : 'preferred_shipping_line_ids',
		label          : 'Preferred Shipping lines',
		type           : 'async-select',
		asyncKey       : 'list_operators',
		initialCall    : true,
		params         : SHIPPING_LINE_PARAMS,
		defaultOptions : true,
		placeholder:
			"Enter preferred shipping line only if customer won't accept any other line",
	},
	{
		name  : 'preferred_detention_free_days',
		type  : 'number',
		label : 'Preferred Detention Days',
	},
	{
		name        : 'commodity_description',
		type        : 'textarea',
		label       : 'Commodity Description',
		placeholder : 'Please add commodity description here...',
	},
	{
		name        : 'remarks',
		type        : 'textarea',
		label       : 'Remarks',
		placeholder : 'Please add any specific requirements here...',
	},
	{
		name     : 'file_upload',
		type     : 'upload',
		label    : 'Upload Documents',
		multiple : true,
		placeholder:
			'Please upload supporting documents like MSDS, packing list etc.',
	},
];

export default fclFeedBackControls;
