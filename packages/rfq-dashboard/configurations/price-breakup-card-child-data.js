export const priceBreakupChildData = [
	{
		title : { service: 'Ocean Freight (Ashutosh Shipping)', labels: ['Inco-DPP'] },
		key   : 'ocean_fright',
		data  : [
			{
				service               : 'Basic Fright',
				base_price            : '100000',
				margin_type           : 'absolute_total',
				margin_value_currency : 'usd',
				margin_value          : '21500',
			},
			{
				service               : 'Basic Fright',
				base_price            : '100000',
				margin_type           : 'absolute_total',
				margin_value_currency : 'usd',
				margin_value          : '21500',
			},
		],
	},
	{
		title : { service: 'Origin FCL Freight Local', labels: ['Export'] },
		key   : 'ocean_fcl_frieght_local',
		data  : [
			{
				service               : 'Destination Shipping Line All In Charges',
				base_price            : '11000',
				margin_type           : 'absolute_total',
				margin_value_currency : 'inr',
				margin_value          : '100',
			},
			{
				service               : 'B/L Fee',
				base_price            : '9000',
				margin_type           : 'absolute_total',
				margin_value_currency : 'inr',
				margin_value          : '500',
			},
			{
				service               : 'B/L Fee',
				base_price            : '500',
				margin_type           : 'absolute_unit',
				margin_value_currency : 'inr',
				margin_value          : '50',
			},
			{
				service               : 'Seal Charges',
				base_price            : '10000',
				margin_type           : 'absolute_unit',
				margin_value_currency : 'inr',
				margin_value          : '1000',
			},
		],
	},
];
