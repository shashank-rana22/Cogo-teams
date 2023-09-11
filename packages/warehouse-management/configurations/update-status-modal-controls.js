const controls = [
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
		key   : 'edit',
		label : 'Actions',
		span  : 0.4,
		func  : 'handleUpdateStatus',
	},
];
export default controls;
