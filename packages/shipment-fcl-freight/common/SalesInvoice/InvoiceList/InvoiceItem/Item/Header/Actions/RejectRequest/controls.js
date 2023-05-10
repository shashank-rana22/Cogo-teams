const controls = [
	{
		label: 'Reason',
		type: 'select',
		name: 'reason',
		theme: 'admin',
		placeholder: 'Select',
		span: 6,
		options: [
			{
				label: 'Translation Issue',
				value: 'translated_issue',
			},
			{
				label: 'Line Item Editing',
				value: 'line_item_edit',
			},
		],
		rules: { required: 'Required' },
	},
	{
		type: 'textarea',
		name: 'reject_remarks',
		placeholder: 'Enter your Remarks',
		theme: 'admin',
		span: 12,
	},
];

export default controls;
