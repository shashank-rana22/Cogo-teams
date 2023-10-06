const controls = [
	{
		name        : 'document_number',
		label       : 'MAWB Number',
		type        : 'text',
		placeholder : 'Enter MAWB Number',
		span        : 6,
		rules       : {
			required: 'MAWB number is required',
		},
	},
	{
		drag  : true,
		name  : 'url',
		span  : 6,
		type  : 'file',
		label : 'Upload Carting Document',
		rules : {
			required: 'Document is required',
		},
		accept: `image/*,.pdf,.doc,.docx,.xlsx,
        application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
		multiple      : 'true',
		showLabel     : false,
		themeType     : 'secondary',
		isShipment    : true,
		uploadIcon    : 'ic-upload',
		uploadType    : 'aws',
		document_type : 'carting_order',
	},
];

export default controls;
