export const serviceOptions = [
	{ label: 'Fcl Freight', value: 'fcl_freight' },
	{ label: 'Air Custom', value: 'air_customs' },
	{ label: 'Air Freight', value: 'air_freight' },
	{ label: 'Ftl Freight', value: 'ftl_freight' },
	{ label: 'Ltl Freight', value: 'ltl_freight' },
];

export const statusOptions = [
	{
		value : 'active',
		label : 'Active',
	},
	{
		value : 'completed',
		label : 'Completed',
	},
	{
		value : 'cancelled',
		label : 'Cancelled',
	},
];

export const rdStatusOptions = [
	{
		value : 'active',
		label : 'Active',
	},
	{
		value : 'completed',
		label : 'Completed',
	},
];

export const tradeOptions = [
	{ label: 'Import', value: 'import' }, { label: 'Export', value: 'export' },
];

export const shipmentSourceOptions = [
	{
		key      : 'spot_booking',
		children : 'Spot Booking',
	},
	{
		key      : 'quotation',
		children : 'Quotation',

	},
	{
		key      : 'direct',
		children : 'Direct',
	},
	{
		key      : 'contract',
		children : 'Contract Bookings',
	},
];

export const sortByOptions = [
	{ label: 'Created At Descending', value: 'created_at_desc' },
	{ label: 'Created At Ascending', value: 'created_at_asc' },
	{ label: 'Schedule Departure Ascending', value: 'schedule_departure_asc' },
	{ label: 'Schedule Departure Descending', value: 'schedule_departure_desc' },
];
