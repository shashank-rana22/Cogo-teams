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
	{
		name    : 'status',
		type    : 'chips',
		label   : 'Request Status',
		options : [
			{ value: 'pending', label: 'Pending' },
			{ value: 'approved', label: 'Approved' },
			{ value: 'rejected', label: 'Rejected' },
		],
	},
	{
		name                  : 'created_at',
		type                  : 'dateRangePicker',
		label                 : 'Requested At',
		isPreviousDaysAllowed : true,
	},
];

export default controls;
