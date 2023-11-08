import CURRENCY_CODE_OPTIONS from './currency-options';

const getFclFeedbackControls = ({ rates_excludes_ids = [] }) => {
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
			min   : 0,
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
			name        : 'preferred_shipping_line_ids',
			label       : 'Preferred Shipping lines',
			type        : 'async-select',
			asyncKey    : 'list_operators',
			initialCall : true,
			params      : {
				filters: {
					operator_type : 'shipping_line',
					status        : 'active',
					exclude_ids   : rates_excludes_ids,
				},
				page_limit : 100,
				sort_by    : 'short_name',
				sort_type  : 'asc',
			},
			defaultOptions : true,
			multiple       : true,
			placeholder:
				"Enter preferred shipping line only if customer won't accept any other line",
		},
		{
			name        : 'temperature',
			label       : 'Temperature (C)',
			type        : 'number',
			placeholder : 'Eg. 25',
			min         : -35,
			max         : 30,
			span        : 4,
			rules       : { required: 'Required' },
		},
		{
			name        : 'humidity',
			label       : 'Humidity (%)',
			type        : 'number',
			placeholder : 'Eg. 45',
			min         : 0,
			max         : 100,
			span        : 4,
			rules       : { required: 'Required' },
		},
		{
			name        : 'ventilation',
			label       : 'Ventilation (%)',
			type        : 'number',
			placeholder : 'Eg. 36',
			min         : 0,
			max         : 100,
			span        : 4,
			rules       : { required: 'Required' },
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

	return fclFeedbackControls;
};

export default getFclFeedbackControls;
