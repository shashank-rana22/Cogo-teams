const getControls = (id, value) => [
	{
		name         : `${id}q`,
		type         : 'input',
		placeholder  : 'Questions',
		defaultValue : '0',
		rules        : { required: 'This is required', max: value },
	},
	{
		name         : `${id}c`,
		type         : 'input',
		defaultValue : '0',
		placeholder  : 'Cases',
		rules        : { required: 'This is required', max: value },
	},

];

export default getControls;
