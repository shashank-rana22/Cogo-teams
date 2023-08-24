import CURRENCY_CODE_OPTIONS from './currency-options';

const SHIPPING_LINE_PARAMS = {
	filters    : { operator_type: 'shipping_line', status: 'active' },
	page_limit : 100,
	sort_by    : 'short_name',
	sort_type  : 'asc',
};

const fclFeedbackControls = [
	{
		name    : 'preferred_freight_rate_currency',
		label   : 'Currency',
		type    : 'select',
		options : CURRENCY_CODE_OPTIONS,
		span    : 4,
	},
	{
		name  : 'preferred_freight_rate',
		label : 'Indicative Rate',
		type  : 'number',
		span  : 4,
	},
	{
		name  : 'cargo_readiness_date',
		label : 'Cargo Ready Date',
		type  : 'datepicker',
		span  : 4,
		rules : { required: true },
	},
	{
		name           : 'preferred_shipping_line_ids',
		label          : 'Preferred Shipping lines',
		type           : 'async-select',
		asyncKey       : 'list_operators',
		initialCall    : true,
		params         : SHIPPING_LINE_PARAMS,
		defaultOptions : true,
		multiple       : true,
		placeholder:
			"Enter preferred shipping line only if customer won't accept any other line",
	},
	{
		name        : 'commodity_description',
		type        : 'textarea',
		label       : 'Commodity Description',
		placeholder : 'Please add commodity description here...',
		span        : 12,
		rules       : { required: true },
	},
	{
		name  : 'remarks',
		type  : 'textarea',
		label : 'Remarks',
		placeholder:
            'Please add preferred sailing date and other specific requirements...',
		span  : 12,
		rules : { required: true },
	},
	{
		name     : 'file',
		type     : 'file',
		multiple : true,
		label    : 'Upload documents (MSDS, packing list etc.)',
		span     : 6,
	},
];
export default fclFeedbackControls;
