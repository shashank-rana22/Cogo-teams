import sop2Options from './so2Options.json';

const so2Controls = ({
	supplierOptions = [],
	SUPPLY_AGENT = [],
	serviceDocsOptions = [],
}) => [
	{
		label       : 'Choose Supplier',
		name        : 'supplier_id',
		type        : 'select',
		options     : supplierOptions,
		placeholder : 'Select Supplier',
		rules       : { required: 'This field is Required' },
		span        : 7,
	},
	{
		label       : 'Please tell us the reason for raising an alarm',
		name        : 'fraud_reason',
		type        : 'select',
		span        : 7,
		options     : sop2Options,
		placeholder : 'Select a reason',
		rules       : { required: 'This field is Required' },
	},
	{
		label   : 'How did you get to know about this?',
		name    : 'source',
		type    : 'radio',
		span    : 10,
		rules   : { required: 'This field is Required' },
		options : [
			{ label: 'Word of Mouth', value: 'word_of_mouth' },
			{ label: 'News', value: 'news' },
			{ label: 'Social media', value: 'social_media' },
		],
	},
	{
		label      : 'Attach Proof',
		name       : 'proof_url',
		span       : 7,
		type       : 'file',
		drag       : true,
		uploadIcon : 'ic-upload',
		height     : 80,
		accept:
					`image/*,.pdf,.doc,.docx,.xlsx,
                    application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
		uploadType: 'aws',
	},
	{
		label   : 'Is the yard same as booking note?',
		name    : 'is_yard_same',
		type    : 'radio',
		span    : 7,
		options : [
			{ label: 'Yes', value: 'yes' },
			{ label: 'No', value: 'no' },
		],
		rules: { required: 'This field is Required' },
	},
	{
		label       : 'Please enter the name of the yard',
		name        : 'name_of_yard',
		type        : 'text',
		span        : 7,
		placeholder : 'Type...',
		rules       : { required: 'This field is Required' },
	},
	{
		label       : 'Who did you get in touch with?',
		name        : 'poc_name',
		type        : 'text',
		span        : 6,
		placeholder : 'Enter name...',
		rules       : { required: 'This field is Required' },
	},
	{
		label       : 'Enter mobile no.',
		name        : 'poc_mobile',
		type        : 'mobile-number-select',
		span        : 6,
		placeholder : 'Enter Mobile No',
		rules       : { required: 'This field is Required' },
		select2     : 'new small',
	},
	{
		label       : 'Select the Service',
		name        : 'select_document',
		type        : 'select',
		options     : serviceDocsOptions,
		placeholder : 'select service',
		rules       : { required: 'This field is Required' },
		span        : 7,
	},
	{
		label   : 'Select the Air Export Document',
		name    : 'air_export',
		type    : 'radio',
		span    : 7,
		options : [
			{ label: 'Draft AWB', value: 'draft_awb' },
			{ label: 'Final AWB', value: 'final_awb' },
		],
		rules: { required: 'This field is Required' },
	},
	{
		label   : 'Select the Air Import Document',
		name    : 'air_import',
		type    : 'radio',
		span    : 7,
		options : [
			{ label: 'Pre-alert', value: 'pre_alert' },
			{ label: 'HAWB', value: 'hawb' },
			{ label: 'DO', value: 'do' },
			{ label: 'MAWB', value: 'mawb' },
		],
		rules: { required: 'This field is Required' },
	},
	{
		label   : 'Select the Custom Document',
		name    : 'customs',
		type    : 'radio',
		span    : 7,
		options : [
			{ label: 'BGM', value: 'bgm' },
			{ label: 'TR', value: 'tr' },
			{ label: 'BOE', value: 'boe' },
			{ label: 'LEO', value: 'leo' },
			{ label: 'Gate-in-Docs', value: 'gate_in_docs' },
		],
		rules: { required: 'This field is Required' },
	},
	{
		label   : 'Was this issue escalated to supply?',
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
		label       : 'Who did you escalate it to?',
		name        : 'who_escalate',
		type        : 'select',
		options     : SUPPLY_AGENT,
		span        : 7,
		placeholder : 'Select Supply Agent',
	},
	{
		label                 : 'When did you escalate it?',
		name                  : 'escalated_at',
		type                  : 'datepicker',
		maxDate               : new Date(),
		isPreviousDaysAllowed : true,
		withTimePicker        : true,
		span                  : 6,
		placeholder           : 'Select a Date and Time',
		rules                 : { required: 'This field is Required' },
	},
	{
		label      : 'Attach Screenshot',
		name       : 'screenshot',
		span       : 7,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		uploadIcon : 'ic-upload',
		height     : 80,
		accept:
					`image/*,.pdf,.doc,.docx,.xlsx,application/msword,
                    application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
		uploadType : 'aws',
		rules      : { required: 'This field is Required' },
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

export default so2Controls;
