export const ContainerSizeOptions = [
	{
		key      : '20',
		disabled : false,
		children : '20 FT',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : '40',
		disabled : false,
		children : '40 FT',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : '40HC',
		disabled : false,
		children : '40 FT HC',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : '45HC',
		disabled : false,
		children : '45 FT HC',
		suffix   : null,
		tooltip  : false,
	},
];

export const CommodityTypeOptions = [
	{
		key      : 'standard',
		children : 'Standard (Dry)',
		disabled : false,
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'refer',
		children : 'Refrigerated (Reefer)',
		disabled : false,
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'open_top',
		children : 'Open Top',
		disabled : false,
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'flat_rack',
		children : 'Flat Rack',
		disabled : false,
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'iso_tank',
		children : 'ISO Tank',
		disabled : false,
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'open_side',
		children : 'Open Side (One Door Open)',
		disabled : false,
		suffix   : null,
		tooltip  : false,
	},
];

export const INCO_TERM_MAPPING = {
	export : ['cif', 'cfr', 'cpt', 'cip', 'dat', 'dap', 'ddp'],
	import : ['fob', 'exw', 'fca', 'fas'],
};
