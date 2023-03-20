const getControls = (id, val) => [
	{
		name        : `${id}q`,
		type        : 'number',
		placeholder : 'Questions',
		rules       : {
			required : { value: true, message: 'This is required' },
			validate : (value) => (value > val ? 'must be <= available questions' : true),
		},
	},
	{
		name        : `${id}c`,
		type        : 'number',
		placeholder : 'Cases',
		rules       : {
			required : { value: true, message: 'This is required' },
			validate : (value) => (value > val ? 'must be <= available cases' : true),
		},
	},

];

export default getControls;
