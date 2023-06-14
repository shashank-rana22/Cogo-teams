export const SERVICE_OPTIONS = [

	{ label: 'FCL Freight', value: 'fcl_freight' },
	{ label: 'LCL Freight', value: 'lcl_freight' },
	{ label: 'FTL Freight', value: 'ftl_freight' },
	{ label: 'LTL Freight', value: 'ltl_freight' },
	{ label: 'Air Freight', value: 'air_freight' },
	{ label: 'Haulage', value: 'haulage_freight' },
];

export const CYCLE_OPTIONS = [
	{
		label: 'Active', value: 'active',
	},
	{
		label: 'Inactive', value: 'inactive',
	},
];

export const MONTH_DAYS = Array(28).fill(null).map((item, index) => (
	{ label: String(index + 1), value: String(index + 1) }
));

export const WEEK_OPTIONS = [
	{
		key      : 'monday',
		children : 'Monday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'tuesday',
		children : 'Tuesday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'wednesday',
		children : 'Wednesday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'thursday',
		children : 'Thursday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'friday',
		children : 'Friday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'saturday',
		children : 'Saturday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'sunday',
		children : 'Sunday',
		suffix   : null,
		tooltip  : false,
	},
];
