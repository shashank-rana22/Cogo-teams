const getControls = () => [
	{
		name        : 'question_name',
		label       : 'Name of Question Set',
		type        : 'input',
		placeholder : 'Type name...',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'cogo_entity',
		label       : 'Select Cogo Entity',
		type        : 'select',
		placeholder : 'Select Cogo Entity',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'set_topic',
		label       : 'Select Set Topic',
		type        : 'select',
		placeholder : 'Select topic name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'set_user_groups',
		label       : 'Select Set User Groups',
		type        : 'select',
		placeholder : 'Select User Groups',
	},
];

export default getControls;
