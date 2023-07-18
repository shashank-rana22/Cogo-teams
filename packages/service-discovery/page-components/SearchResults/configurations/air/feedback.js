import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import CustomSelectOption from '../../../../common/CustomSelectOption';

const renderLabel = (option) => CustomSelectOption({ option, key: 'airlines' });

const airFeedBackControls = [
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
				label : 'Unpreferred Air Line',
				value : 'unpreferred_airlines',
			},
		],
		rules: { required: 'Required' },
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
		span  : 10,
	},
	{
		name        : 'preferred_airline_ids',
		label       : 'Preferred Air lines',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		initialCall : true,
		renderLabel,
		multiple    : true,
		placeholder:
			"Enter preferred airline line only if customer won't accept any other line",
	},
	{
		name  : 'remarks',
		type  : 'textarea',
		label : 'Remarks',
		placeholder:
			'Please add commodity details and other specific requirements here...',
	},
];

export default airFeedBackControls;
