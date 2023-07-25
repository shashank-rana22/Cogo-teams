export const serviceOptions = [
	{ label: 'FCL Freight', value: 'fcl_freight' },
	{ label: 'Air Freight', value: 'air_freight' },
	{ label: 'Lcl Freight', value: 'lcl_freight' },
	{ label: 'Air Custom', value: 'air_customs' },
	{ label: 'FTL Freight', value: 'ftl_freight' },
	{ label: 'LTL Freight', value: 'ltl_freight' },
	{ label: 'FCL Customs', value: 'fcl_customs' },
	{ label: 'LCL Customs', value: 'lcl_customs' },
	{ label: 'Haulage Freight', value: 'haulage_freight' },
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
	{
		value : 'long_sail',
		label : 'Long Sail',
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
	{ label: 'Created on : Latest', value: 'created_at_desc' },
	{ label: 'Created on : Earliest', value: 'created_at_asc' },
	{ label: 'Schedule Departure : Latest', value: 'schedule_departure_desc' },
	{ label: 'Schedule Departure : Earliest', value: 'schedule_departure_asc' },
];
