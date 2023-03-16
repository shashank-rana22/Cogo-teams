export const incoTermHashMapping = [
	{
		label       : 'CIF',
		value       : 'cif',
		tradeType   : 'export',
		description : 'Cost, Insurance, Freight',
	},
	{
		label       : 'CFR',
		value       : 'cfr',
		tradeType   : 'export',
		description : 'Cost and Freight',
	},
	{
		label       : 'CPT',
		value       : 'cpt',
		tradeType   : 'export',
		description : 'Carriage Paid To',
	},
	{
		label       : 'CIP',
		value       : 'cip',
		tradeType   : 'export',
		description : 'Carriage and Insurance Paid',
	},
	{
		label       : 'DAT',
		value       : 'dat',
		tradeType   : 'export',
		description : 'Delivered at Terminal (named terminal at port or place of destination)',
	},
	{
		label       : 'DAP',
		value       : 'dap',
		tradeType   : 'export',
		description : 'Delivered At Place (named place of destination)',
	},
	{
		label       : 'DDP',
		value       : 'ddp',
		tradeType   : 'export',
		description : 'Delivered Duty Paid',
	},
	{
		label       : 'FOB',
		value       : 'fob',
		tradeType   : 'import',
		description : 'Free On Board',
	},
	{ label: 'EXW', value: 'exw', tradeType: 'import', description: 'ExWorks' },
	{ label: 'FCA', value: 'fca', tradeType: 'import', description: 'Free Carrier' },
	{
		label       : 'FAS',
		value       : 'fas',
		tradeType   : 'import',
		description : 'Free Alongside Ship',
	},
];

export const incoTermTradeType = {
	cif : 'export',
	cfr : 'export',
	cpt : 'export',
	cip : 'export',
	dat : 'export',
	dap : 'export',
	ddp : 'export',
	fob : 'import',
	exw : 'import',
	fca : 'import',
	fas : 'import',
};
