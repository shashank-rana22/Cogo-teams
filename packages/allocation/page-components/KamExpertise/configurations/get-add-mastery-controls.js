const controls = [
	{
		name        : 'mastery_name',
		label       : 'Mastery Name',
		placeholder : 'Multi Modal Maestro',
		type        : 'text',
		rules       : {
			required: 'Mastery name is required',
		},
		isClearable: true,
	},
	{
		name        : 'badges',
		label       : 'Badges',
		placeholder : 'Select',
		type        : 'multiSelect',
		options     : [],
		rules       : {
			required: 'Select a Badge',
		},
		isClearable : false,
		styles      : {
			width: '200px',
		},
	},
	// ToDo : add a control for the image to be uploaded
];

export default controls;
