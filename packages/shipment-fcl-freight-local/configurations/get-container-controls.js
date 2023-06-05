const controls = [
	{
		name             : 'bl_details',
		type             : 'fieldArray',
		showDeleteButton : false,
		showButtons      : false,
		controls         : [
			{
				name  : 'bl_number',
				type  : 'text',
				label : 'Bl number',
				rules : {
					required: { value: true, message: 'Bl number is required' },
				},
				span : 6,
				show : true,
			},
			{
				name     : 'container_number',
				label    : 'Container number',
				type     : 'select',
				multiple : true,
				options  : [],
				rules    : {
					required: { value: true, message: 'Container is required' },
				},
				span : 6,
				show : true,
			},
		],
	},
];
export default controls;
