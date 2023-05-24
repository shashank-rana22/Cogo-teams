const controls = [
	{
		name        : 'country_values',
		placeholder : 'Countries',
		width       : '15%',
		options     : [
			{ label: 'INDIA', value: 'INDIA' },
		],
	},
	{
		name        : 'shipment_type_values',
		placeholder : 'Shipment Type',
		width       : '15%',
		options     : [
			{ label: 'Import', value: 'import' },
			{ label: 'Export', value: 'export' },
		],
	},
	{
		name        : 'shipment_mode_values',
		placeholder : 'Shipment Mode',
		width       : '18%',
		options     : [
			{ label: 'SEA', value: 'SEA' },
			{ label: 'AIR', value: 'AIR' },
		],
	},
	{
		name        : 'incoterm_values',
		placeholder : 'Incoterm',
		width       : '12%',
		options     : [
			{ label: 'CIF', value: 'CIF' },
			{ label: 'CF', value: 'CF' },
			{ label: 'CI', value: 'CI' },
			{ label: 'FOB', value: 'FOB' },
		],

	},
];
export default controls;
