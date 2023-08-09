const controls = [
	{
		name        : 'length',
		label       : 'Length',
		type        : 'number',
		placeholder : 'Length',
		span        : 4,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'breadth',
		label       : 'Breadth',
		type        : 'number',
		placeholder : 'Breadth',
		span        : 4,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'height',
		label       : 'Height',
		type        : 'number',
		placeholder : 'Height',
		span        : 4,
		rules       : { required: 'This is required' },
	},
	{
		name    : 'servicesSelected',
		label   : 'Services',
		type    : 'checkbox_group',
		span    : 12,
		options : [
			{ label: 'Marking', value: 'marking' },
			{ label: 'Packing', value: 'packing' },
			{ label: 'Palletization', value: 'palletization' },
		],
	},
	{
		name    : 'statusSelected',
		label   : 'Status',
		type    : 'checkbox_group',
		span    : 12,
		options : [
			{ label: 'Not Recieved', value: 'not_recieved' },
			{ label: 'Recieved', value: 'recieved' },
			{ label: 'Pending', value: 'pending' },
			{ label: 'Ready to ship', value: 'ready_to_ship' },
		],
	},
	{
		key   : 'edit',
		label : 'Actions',
		span  : 0.4,
		func  : 'handleUpdateStatus',
	},
];
export default controls;
