const getControls = (userOptions, isDisabled = false) => [
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
			options     : userOptions,
			type        : 'multi-select',
			placeholder : 'User groups',
		},
		],
		type: 'select-entity-usergroups',
	},
	{
		name    : 'select_users',
		label   : 'Select Users within Group',
		type    : 'radioGroup',
		options : [{ name: 'all', value: 'all', label: 'All', disabled: isDisabled },
			{ name: 'excel', value: 'excel', label: 'Upload User list Excel', disabled: isDisabled }],
		rules: { required: 'This is required' },

	},
];

export default getControls;
