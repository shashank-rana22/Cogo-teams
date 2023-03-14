const controls = [
	{
		name: 'documents',
		type: 'fieldArray',
		value: [
			{
				url: '',
				amount: '',
				payment_mode: '',
				invoice_number: '',
				reference_number: '',
			},
		],
		controls: [
			{
				name: 'invoice_number',
				span: 2.5,
				type: 'text',
				label: 'Invoice Number',
				className: 'primary lg',
				disabled: true,
				rules: {
					required: {
						value: true,
						message: 'This is required',
					},
				},
			},
			{
				name: 'payment_mode',
				span: 1.5,
				type: 'select',
				label: 'Payment Mode',
				className: 'primary lg',
				rules: {
					required: {
						value: true,
						message: 'This is required',
					},
				},
				options: [
					{
						label: 'Gateway',
						value: 'GATEWAY',
					},
					{
						label: 'Bank',
						value: 'BANK',
					},
					{
						label: 'UPI',
						value: 'UPI',
					},
				],
			},
			{
				name: 'amount',
				span: 2,
				type: 'price-select',
				label: 'Total amount',
				className: 'primary lg',
				disabled: true,
				rules: {
					required: {
						value: true,
						message: 'This is required',
					},
				},
			},
			{
				name: 'reference_number',
				span: 3,
				type: 'text',
				label: 'Payment Reference Number',
				className: 'primary lg',
				rules: {
					required: {
						value: true,
						message: 'This is required',
					},
				},
			},
			{
				drag: true,
				name: 'url',
				span: 3,
				type: 'file',
				label: 'Payment Proof Document',
				className: 'primary lg',
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
		showButtons: false,
		showDeleteButton: false,
	},
];

export default controls;
