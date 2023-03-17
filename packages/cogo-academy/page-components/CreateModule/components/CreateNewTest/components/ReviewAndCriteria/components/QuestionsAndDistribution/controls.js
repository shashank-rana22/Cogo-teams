const getControls = (id, value) => [
	{
		name         : `${id}_standalone`,
		type         : 'input',
		placeholder  : 'Questions',
		defaultValue : '0',
		rules        : { required: 'This is required', max: value },
	},
	{
		name         : `${id}_case`,
		type         : 'input',
		defaultValue : '0',
		placeholder  : 'Cases',
		rules        : { required: 'This is required', max: value },
	},

];

export default getControls;
