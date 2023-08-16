import SERVICE_OPTIONS from './services-options';

const getControls = ({ service = '', organization_id = '' }) => [
	{
		name        : 'organization_id',
		type        : 'async-select',
		label       : 'Promo for',
		placeholder : 'Organization',
		asyncKey    : 'organizations',
		value       : organization_id,
		span        : 6,
		rules       : { required: true },
	},
	{
		name        : 'service_type',
		type        : 'select',
		label       : 'Services',
		placeholder : 'Choose',
		value       : service,
		span        : 6,
		options     : SERVICE_OPTIONS,
		rules       : { required: true },
	},
	{
		name        : 'purchased_type',
		type        : 'multi-select',
		label       : 'Rate Type',
		placeholder : 'Select type',
		options     : [
			{ label: 'Marketplace', value: 'spot_rates' },
			{ label: 'Cogoassured', value: 'cogo_assured_rate' },
		],
		span  : 6,
		rules : { required: 'This is required' },
	},
	{
		name  : 'max_amount',
		label : 'Enter Max Amount',
		type  : 'price-select',
		min   : 0,
		span  : 6,
		value : { currency: 'USD' },
		rules : { required: 'This is required' },
	},
	{
		name               : 'terms_and_conditions',
		label              : 'Terms and Conditions',
		placeholder        : 'Type Term',
		type               : 'fieldArray',
		span               : 12,
		showLabelOnce      : true,
		noDeleteButtonTill : 1,
		controls           : [
			{
				label : 'Terms and Conditions',
				name  : 'term',
				type  : 'textarea',
				span  : 12,
				rules : { required: 'This is required' },
			},
		],
	},
];

export default getControls;
