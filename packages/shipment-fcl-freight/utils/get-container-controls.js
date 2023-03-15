const getContainerControl = () => {
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
					name  : 'bl_id',
					type  : 'text',
					label : 'bl_id',
					rules : { required: { value: true, message: 'Bl id is required' } },
					show  : false,
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
				{
					name  : 'id',
					type  : 'text',
					label : 'id',
					rules : {
						required: { value: true, message: 'Container id is required' },
					},
					show: false,
				},
			],
		},
	];
	return controls;
};

export default getContainerControl;
