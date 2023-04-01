const controls = [
	{
		name    : 'expertise_type',
		label   : 'Select Expertise',
		type    : 'select',
		options : [
			{ value: 'customer_expertise', label: 'Customer Expertise' },
			{ value: 'trade_expertise', label: 'Trade Expertise' },
			{ value: 'commodity_expertise', label: 'Commodity Expertise' },
			{ value: 'miscellaneous_expertise', label: 'Miscellaneous' },
		],
		rules: {
			required: 'Expertise is required',
		},
		isClearable: true,
	},
	{
		name  : 'condition_name',
		label : 'Condition Name',
		type  : 'text',
		rules : {
			required: 'Specify Condition',
		},
	},
	{
		name        : 'group_name',
		label       : 'Group Name',
		type        : 'asyncSelect',
		asyncKey    : 'condition_group_options',
		initialCall : true,
		disabled    : true,
		isClearable : true,
		params      : {
			status: 'live',
		},

	},
	{
		name    : 'event_state_on',
		label   : 'Event Trigger',
		type    : 'select',
		options : [
			{ value: 'in_progress', label: 'Shipment Creation' },
			{ value: 'completed', label: 'Shipment Completed' },
		],
		rules: {
			required: 'Event Trigger is required',
		},
		isClearable: true,
	},
	{
		name  : 'description',
		label : 'Description',
		type  : 'text',
	},
];

export default controls;
