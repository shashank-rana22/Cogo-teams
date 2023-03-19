const getControls = () => [
	{
		name        : 'name',
		label       : 'Name of Test',
		type        : 'input',
		placeholder : 'Type name...',
		rules       : { required: 'This is required' },
	},
	{
		name  : 'select_entity_usergroups',
		label : 'Select Entity & User Groups',
		use   : [{
			name        : 'select_entity',
			label       : 'Select Entity & User Groups',
			type        : 'select',
			placeholder : 'Cogo Entity',
			// rules       : { required: 'This is required' },
		}, {
			name        : 'select_user_group',
			label       : 'Select Entity & User Groups',
			type        : 'multiselect',
			placeholder : 'User groups',
			// rules       : { required: 'This is required' },
		}],
		type: 'select_entity_usergroups',
	},
];

export default getControls;
