const controls = [
	{
		label    : 'Filter By Cogo Entity',
		name     : 'cogo_entity_id',
		asyncKey : 'partners',
		type     : 'asyncSelect',
		params   : {
			filters: {
				entity_types   : ['cogoport'],
				current_status : 'active',
			},
			page_limit: 10,
		},
	},
	{
		label    : 'Status',
		name     : 'current_status',
		asyncKey : 'partners',
		type     : 'select',
		options  : [
			{ label: 'Active', value: 'active_test' },
			{ label: 'Draft', value: 'draft' },
			{ label: 'Published', value: 'published' },
			{ label: 'Expired', value: 'expired' },
			{ label: 'Upcoming', value: 'upcoming' },
		],
	},
];

export default controls;
