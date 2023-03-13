const getControls = ({ modifiedControls = [] }) => [
	{
		name        : 'condition_type',
		label       : 'Condition Name',
		placeholder : '',
		type        : 'select', // Todo list-api from backend with async creatable select
		options     : [
			{ value: 'reactivation', label: 'Reactivation' },
			{ value: 'enrichment', label: 'Enrichment' },
			{ value: 'persona', label: 'Persona' },
			{ value: 'conversion', label: 'Conversion' },
			{ value: 'conversion_time', label: 'Conversion Time' },
			{ value: 'retention', label: 'Retention' },
			{ value: 'collection', label: 'Collection' },
			{ value: 'wallet_share_increase', label: 'Wallet Share Increase' },
			{ value: 'industry', label: 'Industry' },
			{ value: 'country', label: 'Country' },
			{ value: 'churn', label: 'Churn/Bad Customer Experience' },
		],
		rules: {
			required: 'Condition Parameter is required',
		},
		// isClearable: true,
	},
	{
		name        : 'score_type',
		label       : 'Score Type',
		placeholder : '',
		type        : 'select',
		options     : [
			{ value: 'absolute', label: 'Absolute' },
			{ value: 'percentage', label: 'Percentage' },
			{ value: 'tat', label: 'TAT' },
		],
		rules: {
			required: 'Score Type is required',
		},
		// isClearable: true,
	},
	...modifiedControls,
	{
		name    : 'impact',
		label   : 'Impact',
		type    : 'select',
		options : [
			{ value: 'low', label: 'Low' },
			{ value: 'medium', label: 'Medium' },
			{ value: 'high', label: 'High' },
		],
		rules: {
			required: 'Impact is required',
		},
		isClearable: true,
	},
];

export default getControls;
