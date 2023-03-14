const controls = [
	{
		name: 'documents',
		type: 'fieldArray',
		value: [
			{
				url: '',
				description: '',
			},
		],
		controls: [
			{
				drag: true,
				name: 'url',
				span: 5,
				type: 'file',
				label: 'Document',
				rules: {
					required: {
						value: true,
						message: 'Document is required',
					},
				},
				accept:
					'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				showLabel: false,
				themeType: 'primary',
				isShipment: true,
				uploadIcon: 'ic-upload',
				uploadType: 'aws',
				document_type: 'indent',
			},
			{
				span: 0.5,
			},
			{
				name: 'description',
				rows: 7,
				span: 5,
				type: 'textarea',
				label: 'Document Description (optional)',
			},
		],
		showButtons: false,
		showDeleteButton: false,
	},
];

export default controls;
