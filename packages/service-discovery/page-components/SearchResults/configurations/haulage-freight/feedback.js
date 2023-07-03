import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const haulageFreightFeedBackControls = [
	{
		name    : 'feedbacks',
		type    : 'checkbox-group',
		label   : '',
		options : [
			{
				label : 'Rate not satisfactory',
				value : 'unsatisfactory_rate',
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
		label : 'Indicative Sell Rate',
		type  : 'number',
		span  : 9,
	},
	{
		name  : 'remarks',
		type  : 'textarea',
		label : 'Remarks',
		placeholder:
			'Please add commodity details and other specific requirements here...',
	},
];

export default haulageFreightFeedBackControls;
