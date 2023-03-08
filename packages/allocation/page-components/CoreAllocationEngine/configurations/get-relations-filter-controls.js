const controls = [
	{
		name    : 'relation_type',
		type    : 'chips',
		label   : 'Relation Type',
		options : [
			{ value: 'keep', label: 'Keep' },
			{ value: 'remove', label: 'Remove' },
		],
	},
	{
		name    : 'stakeholder_type',
		type    : 'chips',
		label   : 'Stakeholder Type',
		options : [
			{ value: 'sales_agent', label: 'Sales Agent' },
			{ value: 'credit_controller', label: 'Credit Controller' },
			{ value: 'ckam', label: 'CKAM' },
		],
	},
];

export default controls;
