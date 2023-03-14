const controls = [
	{
		label: 'Document Description (optional)',
		name: 'description',
		type: 'textarea',
		span: 12,
		rows: 2,
	},
	{
		name: 'url',
		showLabel: false,
		span: 12,
		type: 'file',
		themeType: 'secondary',
		drag: true,
		isShipment: true,
		uploadIcon: 'ic-upload',
		document_type: 'manifest_copy',
		label: '',
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		validations: [
			{
				type: 'required',
				message: 'Document is required',
			},
		],
	},
];

export default controls;
