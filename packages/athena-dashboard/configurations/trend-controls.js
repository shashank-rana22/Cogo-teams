const controls = [
	{
		name    : 'trade_direction',
		label   : 'Trade Direction',
		options : [
			{ value: 'import', label: 'Import' },
			{ value: 'export', label: 'Export' },
		],
	},
	{
		name    : 'hs_code',
		label   : 'HS Codes',
		options : [
			{ label: 'All', value: 'all' },
			{ label: 'Select Codes Below', value: 'select_codes_value' },
		],
	},
];
export default controls;
