const controls = [
	{
		name        : 'industry',
		label       : 'Industry',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'dg', label: 'hjshj' },
		],
		rules: {
			required: 'Industry is required',
		},
		isClearable: true,
	},
	{
		name        : 'account_type',
		label       : 'Account Type',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'dfd', label: 'hjshj' },
		],
		rules: {
			required: 'Account Type is required',
		},
		isClearable: true,
	},
	{
		name        : 'wallet_share',
		label       : 'Wallet Share',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'fd', label: 'sdfdsf' },
		],
		rules: {
			required: 'Wallet Share is required',
		},
		isClearable: true,
	},
	{
		name        : 'engagement_score',
		label       : 'Engagement Score',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'fd', label: 'hjshj' },
		],
		rules: {
			required: 'Engagement Score is required',
		},
		isClearable: true,
	},
	{
		name        : 'last_booking_date',
		label       : 'Last Booking Date(> Days)',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'fd', label: 'hjshj' },
		],
		rules: {
			required: 'Last Booking Date is required',
		},
		isClearable: true,
	},
	{
		name        : 'profile_score',
		label       : 'Profile Score',
		placeholder : '',
		type        : 'number',
		options     : [
			{ value: 'dfg', label: 'hjshj' },
		],
		rules: {
			required: 'Profile Score is required',
		},
		isClearable: true,
	},
];

export default controls;
