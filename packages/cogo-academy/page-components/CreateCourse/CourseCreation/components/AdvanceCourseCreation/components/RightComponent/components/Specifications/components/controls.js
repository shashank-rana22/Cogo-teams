const controls = [
	{
		label : 'Name',
		name  : 'display_name',
		type  : 'text',
		rules : { required: { value: true, message: 'This is required' } },
	},
	{
		label       : 'Description',
		name        : 'description',
		type        : 'textarea',
		rows        : 4,
		placeholder : 'Type description here',
	},
];

export default controls;
