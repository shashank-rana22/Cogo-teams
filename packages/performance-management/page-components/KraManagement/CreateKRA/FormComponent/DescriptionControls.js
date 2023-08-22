const descriptionControls = (kra_name) => [
	{
		name        : 'kra_name',
		type        : 'text',
		label       : 'Enter an appropriate name for the KRA',
		disabled    : kra_name,
		placeholder : 'Name for the KRA',
		rules       : {
			required: 'name is required',
		},
	},
	{
		name        : 'kra_description',
		type        : 'text',
		label       : 'Enter an appropriate description for the KRA',
		placeholder : 'Description for the KRA',
		rules       : {
			required: 'name is required',
		},
	},

];

export default descriptionControls;
