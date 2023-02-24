const controls = [
	{
		name     : 'stakeholder_type',
		type     : 'chips',
		label    : 'Stakeholder Type',
		multiple : true,
		options  : [
			{ value: 'sales_agent', label: 'Sales Agent' },
			{ value: 'booking_agent', label: 'Booking Agent' },
			{ value: 'ckam', label: 'CKAM' },
			{ value: 'supply_agent', label: 'Supply Agent' },
			{ value: 'entity_manager', label: 'Entity Manager' },
			{ value: 'portfolio_manager', label: 'Portfolio Manager' },
		],
	},
];

export default controls;
