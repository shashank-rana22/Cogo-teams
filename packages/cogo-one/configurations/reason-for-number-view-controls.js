const VIEW_NUMBER_REASONS = [
	{
		label : 'Account Assistance',
		value : 'Account Assistance',
	},
	{
		label : 'Account Verification',
		value : 'Account Verification',
	},
	{
		label : 'Order Conversion',
		value : 'Order Conversion',
	},
	{
		label : 'Order Fulfilment',
		value : 'Order Fulfilment',
	},
	{
		label : 'Payment',
		value : 'Payment',
	},
	{
		label : 'Collections',
		value : 'Collections',
	},
	{
		label : 'Technical Support',
		value : 'Technical Support',
	},
	{ label: 'Other', value: 'other' },
];

const CONTROLS = [
	{
		name        : 'reason',
		controlType : 'radio',
		options     : VIEW_NUMBER_REASONS,
	},
	{
		name        : 'custom_reason',
		controlType : 'textArea',
		placeholder : 'Enter your reason',
	},

];

export default CONTROLS;
