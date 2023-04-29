const controls = [
	{
		name        : 'role_ids',
		label       : 'Roles',
		type        : 'asyncSelect',
		multiple    : true,
		placeholder : 'Select roles',
		asyncKey    : 'partner_roles',
		initialCall : false,
		params      : {
			permissions_data_required : false,
			filters                   : {
				partner_entity_types: ['cogoport'],
			},
		},
		isClearable: true,
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
		isClearable: true,
	},
	{
		name    : 'locking_criterion',
		type    : 'chips',
		label   : 'Locking Criterion',
		options : [
			{ value: 'quotations_last_date', label: 'Quotation' },
			{ value: 'shipment_booked', label: 'Shipment Booked' },
		],
		multiple: true,
	},
	{
		name    : 'schedule_type',
		type    : 'chips',
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
		type    : 'chips',
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
