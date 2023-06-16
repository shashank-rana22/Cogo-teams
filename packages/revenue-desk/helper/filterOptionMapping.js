export const serviceOptions = [
	{ label: 'FCL Freight', value: 'fcl_freight' },
	{ label: 'Air Freight', value: 'air_freight' },
	{ label: 'Air Custom', value: 'air_customs' },
	{ label: 'FTL Freight', value: 'ftl_freight' },
	{ label: 'LTL Freight', value: 'ltl_freight' },
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
	{ label: 'Created at : Desc.', value: 'created_at_desc' },
	{ label: 'Created at : Asc.', value: 'created_at_asc' },
	{ label: 'Schedule Departure : Asc.', value: 'schedule_departure_asc' },
	{ label: 'Schedule Departure : Desc.', value: 'schedule_departure_desc' },
];
