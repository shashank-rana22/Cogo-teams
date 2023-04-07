const controls = [
	{
		name        : 'country_values',
		placeholder : 'Countries',
		width       : '180px',
		options     : [
			{ label: 'INDIA', value: 'INDIA' },
		],
	},
	{
		name        : 'shipment_type_values',
		placeholder : 'Shipment Type',
		width       : '200px',
		options     : [
			{ label: 'Import', value: 'import' },
			{ label: 'Export', value: 'export' },
		],
	},
	{
		name        : 'shipment_mode_values',
		placeholder : 'Shipment Mode',
		width       : '220px',
		options     : [
			{ label: 'SEA', value: 'SEA' },
			{ label: 'AIR', value: 'AIR' },
		],
	},
	{
		name        : 'incoterm_values',
		placeholder : 'Incoterm',
		width       : '160px',
		options     : [
			{ label: 'CIF', value: 'CIF' },
			{ label: 'CF', value: 'CF' },
			{ label: 'CI', value: 'CI' },
			{ label: 'FOB', value: 'FOB' },
		],

	},
];
export default controls;
