const getControls = (userOptions) => [
	{
		name        : 'name',
		label       : 'Name of Test',
		type        : 'input',
		placeholder : 'Type name...',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'cogo_entity_id',
		label       : 'Select Cogo Entity',
		type        : 'async-select',
		placeholder : 'Select Cogo Entity',
		initialCall : true,
		asyncKey    : 'partners',
		params      : {
			filters: {
				entity_types : ['cogoport'],
				status       : 'active',
			},
			page_limit: 10,
		},
		rules: { required: 'This is required' },
	},
	{
		name        : 'select_user_group',
		label       : 'Select User Groups',
		options     : userOptions,
		type        : 'multi-select',
		placeholder : 'User groups',
		style       : {
			width: '100%',
		},
	},
	{
		name    : 'select_users',
		label   : 'Select Users within Group',
		type    : 'radioGroup',
		options : [
			{
				name  : 'all',
				value : 'all',
				label : 'All',
			},
			{
				name  : 'excel',
				value : 'excel',
				label : 'Upload User list Excel',
			},
		],
		rules: { required: 'This is required' },
	},
];

export default getControls;
