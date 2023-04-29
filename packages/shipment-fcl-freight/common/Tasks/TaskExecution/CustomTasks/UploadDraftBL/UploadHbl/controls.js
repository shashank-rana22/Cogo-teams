const controls = [
	{
		label : 'Document Description (optional)',
		name  : 'description',
		type  : 'textarea',
		span  : 12,
		size  : 'sm',
	},
	{
		label : 'Bill of lading Number',
		name  : 'document_number',
		type  : 'text',
		span  : 6,
		size  : 'sm',
		rules : [
			{
				type    : 'required',
				message : 'BL Number is required',
			},
		],
	},
	{
		label : 'Container Quantity',
		name  : 'containers_count',
		type  : 'number',
		span  : 6,
		size  : 'sm',
		min   : 1,
		rules : [
			{
				type    : 'required',
				message : 'Container Quantity is required',
			},
			{
				type    : 'min',
				message : 'Container Quantity cannot be less than 1',
				min     : 1,
			},
		],
	},
	{
		name      : 'url',
		showLabel : false,
		span      : 12,
		size      : 'sm',
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/msword,'
			+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		rules: [
			{
				type    : 'required',
				message : 'document is required',
			},
		],
	},
];

export default controls;
