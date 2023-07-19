const controls = (pocOptions = []) => [
	{
		name    : 'recipient_email',
		label   : 'Select Recipient',
		type    : 'radio',
		span    : 12,
		options : pocOptions,
	},
	{
		name  : 'add_cc',
		type  : 'checkbox',
		label : 'Add CC?',
	},
];

export default controls;
