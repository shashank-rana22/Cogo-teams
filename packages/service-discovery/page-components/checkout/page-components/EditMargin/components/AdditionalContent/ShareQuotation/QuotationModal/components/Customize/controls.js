/* eslint-disable max-len */

const controls = [
	{
		name  : 'subject',
		type  : 'text',
		label : 'Email subject',
		placeholder:
			'Ocean FCL Freight Rates: Jawaharlal Nehru (Nhava Sheva) to Jebel Ali',
		span        : 12,
		validations : [
			{ type: 'required', message: 'Please provide the asked information' },
		],
	},
	{
		name        : 'body',
		type        : 'textarea',
		label       : 'Email body',
		span        : 12,
		rows        : 4,
		validations : [
			{
				type    : 'required',
				message : 'Email body is required',
			},
		],
	},
	{
		name : 'closing',
		type : 'textarea',
		value:
			'Checkout freight rates from your Cogoport account.If you would like to finalize this booking click on the button below, or feel free to get in touch with me by replying to this email.',
		label       : 'Closing',
		placeholder : '',
		span        : 12,
		rows        : 3,
	},
	{
		name        : 'terms_and_conditions',
		type        : 'textarea',
		label       : 'Terms and conditions:',
		placeholder : '',
		span        : 12,
		rows        : 6,
		value       : '',
	},
	{
		name       : 'attachment_file_urls',
		showLabel  : false,
		span       : 12,
		type       : 'file',
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
