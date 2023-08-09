const controls = [
	{
		name        : 'length',
		label       : 'Length',
		type        : 'number',
		placeholder : 'Length',
		span        : 2,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'breadth',
		label       : 'Breadth',
		type        : 'number',
		placeholder : 'Breadth',
		span        : 2,
		rules       : { required: 'This is required' },
	},
	{
		name        : 'height',
		label       : 'Height',
		type        : 'number',
		placeholder : 'Height',
		span        : 2,
		rules       : { required: 'This is required' },
	},
	{
		name    : 'services_selected',
		label   : 'Select Services',
		type    : 'checkbox',
		span    : 12,
		options : [
			{ label: 'Marking', value: 'marking' },
			{ label: 'Packing', value: 'packing' },
			{ label: 'Palletization', value: 'palletization' },
		],
		multiple: true,
	},
	{
		name    : 'status',
		label   : 'Status',
		type    : 'checkbox',
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
