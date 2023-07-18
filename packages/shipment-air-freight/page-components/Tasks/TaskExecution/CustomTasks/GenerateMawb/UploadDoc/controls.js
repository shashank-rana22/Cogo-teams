const controls = [
	{
		label        : 'Document Description',
		name         : 'description',
		type         : 'textarea',
		span         : 6,
		rows         : 2,
		className    : 'primary lg',
		showOptional : false,
	},
	{
		name          : 'url',
		span          : 12,
		type          : 'file',
		themeType     : 'secondary',
		drag          : true,
		isShipment    : true,
		uploadIcon    : 'ic-upload',
		document_type : 'draft',
		label         : 'Upload Document',
		accept:
			`image/*,.pdf,.doc,.docx,application/msword,
			application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
		uploadType  : 'aws',
		validations : [
			{
				type    : 'required',
				message : 'Document is required',
			},
		],
		rules: {
			required: true,
		},
		showOptional : false,
		className    : 'primary lg',
	},
];

export default controls;
