const controls = [
	{
		label       : 'Module Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Type Module',
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : 'Module Description',
		name        : 'description',
		type        : 'textarea',
		placeholder : `Add a description to the module.Include what a student may be able 
to do after completing the module`,
		rows  : 4,
		rules : { required: { value: true, message: 'This is required' } },
	},
];

export default controls;
