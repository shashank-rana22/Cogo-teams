const addControl = () => {
	const control = [
		{
			name: 'documents',
			type: 'fieldArray',
			value: [
				{
					url: '',
					quantity: '',
					lr_number: '',
					service_id: '',
					description: '',
				},
			],
			controls: [
				{
					name: 'service_id',
					span: 3,
					type: 'select',
					label: 'Truck Number',
					rules: {
						required: {
							value: true,
							message: 'Truck Number Req',
						},
					},
					options: [],
				},
				{
					name: 'lr_number',
					span: 3,
					type: 'text',
					label: 'LR Number',
					rules: {
						required: {
							value: true,
							message: 'LR Number Req',
						},
					},
				},
				{
					name: 'quantity',
					span: 2,
					type: 'number',
					label: 'Quantity',
				},
				{
					drag: true,
					name: 'url',
					span: 3,
					type: 'file',
					label: 'Document',
					rules: {
						required: {
							value: true,
							message: 'This is required',
						},
					},
					accept:
						'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
					showLabel: false,
					themeType: 'secondary',
					isShipment: true,
					uploadIcon: 'ic-upload',
					uploadType: 'aws',
					document_type: 'checklist',
				},
			],
			showButtons: true,
			showDeleteButton: true,
		},
	];
	return control;
};

export default addControl;
