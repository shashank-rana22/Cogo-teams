const controls = [
	{
		name        : 'expertise',
		label       : 'Select Expertise',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'customer', label: 'Customer' },
		],
		rules: {
			required: 'Expertise is required',
		},
		isClearable: true,
	},
	{
		name        : 'condition',
		label       : 'Condition Name',
		placeholder : '',
		type        : 'text',
		rules       : {
			required: 'Specify Condition',
		},
	},
	{
		name        : 'event_trigger',
		label       : 'Event Trigger',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'shipment_creation', label: 'Shipment Creation' },
		],
		rules: {
			required: 'Event Trigger is required',
		},
		isClearable: true,
	},
	{
		name        : 'attribute',
		label       : 'Attribute',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'account_attribute', label: 'Account Attribute' },
		],
		rules: {
			required: 'Expertise is required',
		},
		isClearable: true,
	},
	{
		name        : 'description',
		label       : 'Description',
		placeholder : '',
		type        : 'text',
		// rules       : {
		// 	required: 'Specify reason',
		// },
	},
];

export default controls;
