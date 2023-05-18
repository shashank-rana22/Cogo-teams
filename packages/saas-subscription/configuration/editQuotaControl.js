const editQuotaControl = [
	{
		name    : 'action',
		label   : 'Action',
		type    : 'radioGroup',
		options : [
			{ label: 'Credit', value: 'credit' },
			{ label: 'Debit', value: 'debit' },
			{ label: 'Reset', value: 'reset' },
		],
		rules: {
			required: true,
		},
	},
	{
		name        : 'quantity',
		label       : 'Enter Quantity',
		size        : 'sm',
		type        : 'number',
		min         : 10,
		placeholder : 'Enter Quantity',
		rules       : {
			required: true,
		},
	},
	{
		name    : 'is_addon',
		label   : 'Is addon',
		type    : 'radioGroup',
		options : [
			{ label: 'True', value: 'true' },
			{ label: 'False', value: 'false' },
		],
		rules: {
			required: true,
		},
	},
];

export default editQuotaControl;
