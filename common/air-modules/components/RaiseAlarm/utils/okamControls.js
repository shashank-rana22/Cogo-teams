import okamOptions from './okamOptions.json';

const okamControls = [
	{
		label       : 'Please tell us the reason for raising an alarm',
		name        : 'fraud_reason',
		type        : 'select',
		span        : 7,
		options     : okamOptions,
		placeholder : 'Select a reason',
		rules       : { required: 'Alarm Reason is Required' },
	},
	{
		label   : 'How did you get to know about this?',
		name    : 'source',
		type    : 'radio',
		span    : 10,
		options : [
			{ label: 'Word of Mouth', value: 'word_of_mouth' },
			{ label: 'News', value: 'news' },
			{ label: 'Social media', value: 'social_media' },
		],
		rules: { required: 'Source is Required' },
	},
	{
		label      : 'Attach Proof(Optional)',
		name       : 'proof_url',
		span       : 7,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		uploadIcon : 'ic-upload',
		height     : 80,
		accept:
                `image/*,.pdf,.doc,.docx,.xlsx,application/msword,
                application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
		uploadType: 'aws',
	},
	{
		label   : 'Was this issue escalated to sales?',
		name    : 'escalated_to_sales',
		type    : 'radio',
		span    : 7,
		options : [
			{ label: 'Yes', value: 'yes' },
			{ label: 'No', value: 'no' },
		],
		rules: { required: 'This field is Required' },
	},
	{
		label          : 'When did you escalate it to sales?',
		name           : 'escalated_to_sales_at',
		type           : 'datepicker',
		maxDate        : new Date(),
		withTimePicker : true,
		span           : 7,
		placeholder    : 'Choose Date and Time',
		rules          : { required: 'This field is Required' },
	},
	{
		label       : 'What is the Cargo Value?',
		name        : 'value_of_cargo',
		type        : 'text',
		span        : 7,
		placeholder : 'Enter Cargo Value',
		rules       : { required: 'This field is Required' },
	},
	{
		label       : 'Detailed Explaination',
		name        : 'detailed_explain',
		type        : 'textarea',
		span        : 10,
		placeholder : 'Please give a detailed explanation',
		rules       : { required: 'This field is Required', min: 15 },
	},
];

export default okamControls;
