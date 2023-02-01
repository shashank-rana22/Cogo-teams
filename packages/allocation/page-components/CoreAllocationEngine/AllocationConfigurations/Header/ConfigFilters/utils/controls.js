const controls = [
	{
		name        : 'role_ids',
		label       : 'Roles',
		type        : 'select',
		multiple    : true,
		placeholder : 'Select roles',
	},
	{
		name        : 'stakeholder_type',
		label       : 'Stakeholder Type',
		type        : 'select',
		placeholder : 'Select stakeholder type',
		options     : [
			{ value: 'sales_agent', label: 'Sales Agent' },
			{ value: 'booking_agent', label: 'Booking Agent' },
			{ value: 'supply_agent', label: 'Supply Agent' },
			{ value: 'entity_manager', label: 'Entity Manager' },
			{ value: 'ckam', label: 'CKAM' },
			{ value: 'credit_controller', label: 'Credit Controller' },
			{ value: 'service_ops2', label: 'Service OPS 2' },
			{ value: 'trade_finance_agent', label: 'Trade Finance Agent' },
		],
	},
	{
		name    : 'locking_criterion',
		type    : 'pills',
		label   : 'Locking Criterion',
		options : [
			{ value: 'quotations_last_date', label: 'Quotation' },
			{ value: 'shipment_booked', label: 'Shipment Booked' },
		],
		multiple: true,
	},
	{
		name    : 'schedule_type',
		type    : 'pills',
		label   : 'Schedule Type',
		options : [
			{ value: 'daily', label: 'Daily' },
			{ value: 'weekly', label: 'Weekly' },
			{ value: 'monthly', label: 'Monthly' },
		],
		multiple: true,
	},
	{
		name    : 'status',
		type    : 'pills',
		label   : 'Status',
		options : [
			{ value: 'active', label: 'Active' },
			{ value: 'draft', label: 'Draft' },
			{ value: 'publishable', label: 'Publishable' },
			{ value: 'checking', label: 'Checking' },
			{ value: 'not_publishable', label: 'Not publishable' },
		],
		multiple: true,
	},
];

export default controls;
