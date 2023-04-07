export const priceBreakupChildData = [
	{
		title : { service: 'Ocean Freight (Ashutosh Shipping)', sell_price: 'USD 1,21,500', labels: ['Inco-DPP'] },
		key   : 'ocean_fright',
		data  : [
			{
				service      : 'Basic Fright',
				base_price   : '1,00,000',
				margin_type  : 'Unit',
				margin_value : '21,500',
				sell_price   : '1,21,500',
			},
		],
	},
	{
		title          : { service: 'Origin FCL Freight Local', sell_price: 'USD 32,150', labels: ['Export'] },
		key            : 'ocean_fcl_frieght_local',
		totalSellPrice : '32,150',
		data           : [
			{
				service      : 'Destination Shipping Line All In Charges',
				base_price   : '11,000',
				margin_type  : 'Unit',
				margin_value : '100',
				sell_price   : '11,100',
			},
			{
				service      : 'B/L Fee',
				base_price   : '9,000',
				margin_type  : 'Unit',
				margin_value : '500',
				sell_price   : '9,500',
			},
			{
				service      : 'B/L Fee',
				base_price   : '500',
				margin_type  : 'Unit',
				margin_value : '50',
				sell_price   : '550',
			},
			{
				service      : 'Seal Charges',
				base_price   : '10,000',
				margin_type  : 'Unit',
				margin_value : '1000',
				sell_price   : '11,000',
			},
		],
	},
];
