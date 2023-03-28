const controls = [
	{
		name        : 'expertise_type',
		label       : 'Select Expertise',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'customer_expertise', label: 'Customer Expertise' },
			{ value: 'trade_expertise', label: 'Trade Expertise' },
			{ value: 'commodity_expertise', label: 'Commodity Expertise' },
			{ value: 'miscellaneous', label: 'Miscellaneous' },
		],
		rules: {
			required: 'Expertise is required',
		},
		isClearable: true,
	},
	{
		name        : 'condition_name',
		label       : 'Condition Name',
		placeholder : '',
		type        : 'text',
		rules       : {
			required: 'Specify Condition',
		},
	},
	{
		name        : 'group_name',
		label       : 'Group Name',
		placeholder : '',
		type        : 'text',
	},
	{
		name        : 'event_state_on',
		label       : 'Event Trigger',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'in_progress', label: 'Shipment Creation' },
			{ value: 'completed', label: 'Shipment Completed' },
		],
		rules: {
			required: 'Event Trigger is required',
		},
		isClearable: true,
	},
	{
		name        : 'description',
		label       : 'Description',
		placeholder : '',
		type        : 'text',
	},
];

export default controls;
