import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import currencies from '../../../../../../helpers/currencies';

const controls = [
	{
		label       : 'Alternate Line',
		name        : 'preferred_shipping_line_ids',
		type        : 'async-select',
		placeholder : 'Select Line',
		asyncKey    : 'list_operators',
		params      : {
			filters: {
				operator_type : 'shipping_line',
				status        : 'active',
			},
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
		styles: { flexBasis: '24%', paddingRight: '40px' },
	},
	{
		label       : 'Select Date Range',
		name        : 'sailing_range',
		type        : 'date-picker',
		placeholder : 'Sailing Week',
		styles      : { flexBasis: '24%', padding: '0px 40px' },
	},
	{
		label       : 'Price Range (Basic Freight)',
		name        : 'alternate_line',
		type        : 'price-range',
		placeholder : 'Sailing Week',
		styles      : { flexBasis: '28%' },
		subControls : [
			{
				name        : 'price_currency',
				type        : 'select',
				placeholder : 'currency',
				value       : GLOBAL_CONSTANTS.currency_code.INR,
				options     : currencies,
				styles      : { flexBasis: '30%' },
			},
			{
				name        : 'min_price',
				type        : 'number',
				placeholder : 'From',
				styles      : { flexBasis: '40%' },
			},
			{
				name        : 'max_price',
				type        : 'number',
				placeholder : 'To',
				styles      : { flexBasis: '40%' },
			},
		],
	},
	{
		label       : 'Specific Vessel',
		name        : 'preferred_vessel_name',
		type        : 'text',
		placeholder : 'Type',
		styles      : { flexBasis: '24%', paddingLeft: '80px' },
	},
];

export default controls;
