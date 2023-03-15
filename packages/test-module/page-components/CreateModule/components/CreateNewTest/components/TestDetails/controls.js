const getControls = () => [
	{
		name        : 'test_name',
		label       : 'Name of Test',
		type        : 'input',
		placeholder : 'Type name...',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'no_of_questions',
		label       : 'No of Questions',
		type        : 'input',
		placeholder : 'type',
		rules       : { required: 'This is required' },
	},
	{
		name  : 'select_entity_usergroups',
		label : 'Select Entity & User Groups',
		use   : [{
			name        : 'no_of_questions',
			label       : 'No of Questions',
			type        : 'select',
			placeholder : 'Cogo Entity',
			rules       : { required: 'This is required' },
		}, {
			name        : 'no_of_questions',
			label       : 'No of Questions',
			type        : 'multiselect',
			placeholder : 'User group',
			rules       : { required: 'This is required' },
		}],
		type: 'select_entity_usergroups',
	},
	{
		name        : 'test_duration',
		label       : 'Duration of Test',
		type        : 'input',
		placeholder : '00 h : 00 min',
	},
];

export default getControls;
