const getControls = () => [
	{
		name        : 'name',
		label       : 'Name of Question Set',
		type        : 'input',
		placeholder : 'Type name...',
		rules       : { required: 'This is required' },
	},
	{
		name     : 'cogo_entity_id',
		label    : 'Select Cogo Entity',
		type     : 'async-select',
		asyncKey : 'partners',
		params   : {
			filters: {
				entity_types : ['cogoport'],
				status       : 'active',
			},
			page_limit: 10,
		},
		placeholder : 'Select Cogo Entity',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'topic',
		label       : 'Select Set Topic',
		type        : 'input',
		placeholder : 'Select topic name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'audience_ids',
		label       : 'Select Set User Groups',
		type        : 'multi-select',
		options     : [],
		placeholder : 'Select User Groups',
	},
];

export default getControls;
