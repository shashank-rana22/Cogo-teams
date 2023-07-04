export const invoiceFilters = [
	{
		name        : 'invoiceView',
		span        : 1,
		type        : 'select',
		placeholder : 'Invoice View',
		options     : [
			{ label: 'All', value: 'all' },
			{ label: 'Migrated', value: 'migrated' },
			{ label: 'COE Accepted', value: 'coe_accepted' },
		],
	},
	{
		name        : 'category',
		span        : 1,
		type        : 'select',
		placeholder : 'Category',
		isClearable : true,
		options     : [
			{ value: 'sl', label: 'Shipping Line' },
			{ value: 'air', label: 'Airline' },
			{ value: 'nvocc', label: 'NVOCC' },
			{ value: 'iata', label: 'IATA' },
			{ value: 'customs_service_provider', label: 'Customs' },
			{ value: 'tsp', label: 'Transporter' },
			{ value: 'ffw', label: 'Freight Forwarder' },
			{ value: 'oth', label: 'Other' },
		],
	},
];
