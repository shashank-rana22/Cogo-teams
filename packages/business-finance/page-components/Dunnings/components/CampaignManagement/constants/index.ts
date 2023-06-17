export const SERVICE_OPTIONS = [

	{ label: 'FCL Freight', value: 'FCL_FREIGHT' },
	{ label: 'LCL Freight', value: 'LCL_FREIGHT' },
	{ label: 'FTL Freight', value: 'FTL_FREIGHT' },
	{ label: 'LTL Freight', value: 'LTL_FREIGHT' },
	{ label: 'Air Freight', value: 'AIR_FREIGHT' },
	{ label: 'Haulage', value: 'HAULAGE_FREIGHT' },
];

export const CYCLE_OPTIONS = [
	{
		label: 'Active', value: 'active',
	},
	{
		label: 'Inactive', value: 'inactive',
	},
];

export const CYCLE_TYPE = [
	{
		label: 'SOA', value: 'SOA',
	},
	{
		label: 'WIS', value: 'WIS',
	},
	{
		label: 'Balance Confirmation',
		value: 'BALANCE_CONFIRMATION', 
	}
]

export const MONTH_DAYS = Array(28).fill(null).map((item, index) => (
	{ label: String(index + 1), value: String(index + 1) }
));

export const WEEK_OPTIONS = [
	{
		key      : 'MONDAY',
		children : 'Monday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'TUESDAY',
		children : 'Tuesday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'WEDNESDAY',
		children : 'Wednesday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'THURSDAY',
		children : 'Thursday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'FRIDAY',
		children : 'Friday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'SATURDAY',
		children : 'Saturday',
		suffix   : null,
		tooltip  : false,
	},
	{
		key      : 'SUNDAY',
		children : 'Sunday',
		suffix   : null,
		tooltip  : false,
	},
];
