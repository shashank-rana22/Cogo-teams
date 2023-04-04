const getControls = ({ mode }) => [
	{
		name        : 'name',
		label       : 'Name of Question Set',
		type        : 'input',
		placeholder : 'Type name...',
		disabled    : mode === 'view',
		rules       : { required: 'This is required' },
	},
	{
		name     : 'cogo_entity_id',
		label    : 'Select Cogo Entity',
		type     : 'async-select',
		asyncKey : 'partners',
		disabled : mode === 'view',
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
		disabled    : mode === 'view',
		placeholder : 'Select topic name',
		rules       : { required: 'This is required' },
	},
];

export default getControls;
