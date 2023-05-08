const controls = [

	{
		label : 'Bill of lading Number',
		name  : 'document_number',
		type  : 'text',
		span  : 6,
		size  : 'sm',
		rules : { required: 'BL Number is required' },
	},
	{
		label : 'Container Quantity',
		name  : 'containers_count',
		type  : 'number',
		span  : 6,
		size  : 'sm',
		min   : 1,
		rules : { required: 'Container Quantity is required' },
	},
	{
		name : 'url',
		type : 'file',
		span : 12,
		size : 'sm',
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/msword,'
			+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		rules: { required: 'Document is required' },
	},
	{
		label : 'Document Description (optional)',
		name  : 'description',
		type  : 'textarea',
		span  : 12,
		size  : 'sm',
	},
];

export default controls;
