const getControls = () => [
	{
		name        : 'name',
		label       : 'Name of Test',
		type        : 'input',
		placeholder : 'Type name...',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'select_entity_usergroups',
		label       : 'Select Entity & User Groups',
		subControls : [{
			name     : 'cogo_entity_id',
			label    : 'Select Cogo Entity:',
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
			name        : 'select_user_group',
			label       : 'Select Entity & User Groups',
			type        : 'multiselect',
			placeholder : 'User groups',
			// rules       : { required: 'This is required' },
		},
		],
		type: 'select-entity-usergroups',
	},
];

export default getControls;
