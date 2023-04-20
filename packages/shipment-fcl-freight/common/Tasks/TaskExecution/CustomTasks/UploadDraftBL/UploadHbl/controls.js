const controls = [
	{
		label : 'Document Description (optional)',
		name  : 'description',
		type  : 'textarea',
		span  : 12,
		rows  : 2,
	},
	{
		label       : 'Bill of lading Number',
		name        : 'document_number',
		type        : 'text',
		span        : 6,
		validations : [
			{
				type    : 'required',
				message : 'BL Number is required',
			},
		],
	},
	{
		label       : 'Container Quantity',
		name        : 'containers_count',
		type        : 'number',
		span        : 6,
		min         : 1,
		validations : [
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
		name          : 'url',
		showLabel     : false,
		span          : 12,
		type          : 'file',
		themeType     : 'secondary',
		drag          : true,
		isShipment    : true,
		uploadIcon    : 'ic-upload',
		document_type : 'draft_house_bill_of_lading',
		label         : '',
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType  : 'aws',
		validations : [
			{
				type    : 'required',
				message : 'document is required',
			},
		],
	},
];

export default controls;
