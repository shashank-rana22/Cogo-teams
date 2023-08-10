const controls = [
	{
		label       : 'Sub Module Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Type here...',
		rules       : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : 'Sub Module Description',
		name        : 'description',
		type        : 'textarea',
		placeholder : `Add a description to the sub module.Include what a student may be able 
to do after completing the sub module`,
		rows  : 4,
		rules : { required: { value: true, message: 'This is required' } },
	},
];

export default controls;
