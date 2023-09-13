import currencies from '@cogoport/air-modules/helpers/currencies';

const controls = [
	{
		label                 : 'LEO date',
		name                  : 'leo_date',
		type                  : 'datepicker',
		isPreviousDaysAllowed : true,
		span                  : 4,
		rules                 : {
			required: true,
		},
	},
	{
		label : 'FOB Value',
		name  : 'fob_value',
		span  : 4,
		type  : 'text',
		rules : {
			required: true,
		},
	},
	{
		label   : 'FOB Currency',
		name    : 'fob_currency',
		span    : 4,
		type    : 'select',
		options : currencies,
		rules   : {
			required: true,
		},
	},
	{
		name      : 'leo_document_url',
		span      : 12,
		type      : 'file',
		themeType : 'secondary',
		drag      : true,
		label     : 'Upload Document',
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
	},
];

export default controls;
