const controls = [
	{
		label   : 'Select Scope',
		name    : 'scope',
		type    : 'chips',
		options : [
			{ label: 'Across All', value: 'across_all' },
			{ label: 'All', value: 'all' },
		],
		span: 12,
	},
	{
		label    : 'Choose Agent',
		name     : 'agent_id',
		type     : 'async_select',
		asyncKey : 'partner_users_ids',
		multiple : false,
		span     : 10,
	},
];
export default controls;
