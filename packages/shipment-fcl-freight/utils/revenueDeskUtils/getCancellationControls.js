const controls = [
	{
		name: 'cancellation_reason',
		type: 'select',
		label: 'Please select Cancellation Reason',
		placeholder: 'Select Reason',
		options: [
			{
				label: 'Profitability Issue',
				value: 'profitability_issue',
			},
			{
				label: 'Space/Inventory not available',
				value: 'space_unavailable',
			},
			{
				label: 'Preferred Line not available',
				value: 'preferred_line_not_avilable',
			},
			{
				label: 'Rates not available',
				value: 'rates_not_available',
			},
		],
		rules: { required: true },
	},
	{
		name: 'cancellation_subreason',
		label: 'Remarks',
		type: 'text',
		className: 'primary md',
		placeholder: 'Type here...',
		rules: {
			required: true,
		},
	},
];

export default controls;
