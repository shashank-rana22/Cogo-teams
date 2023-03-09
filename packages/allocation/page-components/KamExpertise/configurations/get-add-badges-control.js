const controls = [
	{
		name        : 'badge',
		label       : 'Badge Name',
		placeholder : 'Enter Name',
		type        : 'text',
		rules       : {
			required: 'Badge Name is required',
		},
		isClearable: true,
	},
	{
		name        : 'condition',
		label       : 'Condition',
		placeholder : 'Select Events',
		type        : 'select',
		options     : [],
		rules       : {
			required: 'Specify Condition',
		},
	},
	{
		name        : 'description',
		label       : 'Description',
		placeholder : 'Enter Description',
		type        : 'text',
		rules       : {
			required: 'Description is required',
		},
		isClearable: true,
	},
];

export default controls;
