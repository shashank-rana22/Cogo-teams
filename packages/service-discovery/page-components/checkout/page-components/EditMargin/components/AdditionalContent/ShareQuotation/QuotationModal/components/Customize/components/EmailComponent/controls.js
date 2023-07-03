/* eslint-disable max-len */

const controls = [
	{
		name  : 'subject',
		type  : 'text',
		label : 'Email subject',
		placeholder:
			'Ocean FCL Freight Rates: Jawaharlal Nehru (Nhava Sheva) to Jebel Ali',
		validations: [
			{ type: 'required', message: 'Please provide the asked information' },
		],
	},
	{
		name        : 'body',
		type        : 'textarea',
		label       : 'Email body',
		rows        : 4,
		validations : [
			{
				type    : 'required',
				message : 'Email body is required',
			},
		],
	},
	{
		name        : 'closing',
		type        : 'textarea',
		label       : 'Closing',
		placeholder : '',
		rows        : 3,
	},
	{
		name        : 'terms_and_conditions',
		type        : 'textarea',
		label       : 'Terms and conditions:',
		placeholder : '',
		rows        : 6,
	},
	{
		name       : 'attachment_file_urls',
		showLabel  : false,
		span       : 12,
		type       : 'file-uploader',
		themeType  : 'secondary',
		drag       : true,
		multiple   : true,
		uploadIcon : 'ic-upload',
		label      : '',
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
	},
];

export default controls;
