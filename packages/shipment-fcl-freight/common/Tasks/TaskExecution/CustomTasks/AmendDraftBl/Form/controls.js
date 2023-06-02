const controls = [
	{
		label : 'Bill of lading Number',
		name  : 'document_number',
		type  : 'text',
		size  : 'sm',
		span  : 6,
		rules : { required: { value: true, message: 'BL Number is required' } },
	},
	{
		label : 'Container Quantity',
		name  : 'containers_count',
		type  : 'number',
		span  : 6,
		size  : 'sm',
		rules : { required: { value: true, message: 'Container Quantity is required', min: 1 } },
	},
	{
		name  : 'url',
		span  : 12,
		type  : 'file',
		label : 'Document',
		size  : 'sm',
		rules : { required: { value: true, message: 'Document is required' } },
	},
];

export default controls;
