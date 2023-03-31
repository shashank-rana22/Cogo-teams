const controls = [
	{
		label    : 'Filter By Cogo Entity',
		name     : 'cogo_entity_id',
		asyncKey : 'partners',
		type     : 'async-select',
		params   : {
			filters: {
				entity_types : ['cogoport'],
				status       : 'active',
			},
			page_limit: 10,
		},
	},
	{
		label    : 'Status',
		name     : 'status',
		asyncKey : 'partners',
		type     : 'select',
		options  : [
			{ label: 'Active', value: 'active' },
			{ label: 'Draft', value: 'draft' },
			{ label: 'Published', value: 'published' },
		],
	},
];

export default controls;
