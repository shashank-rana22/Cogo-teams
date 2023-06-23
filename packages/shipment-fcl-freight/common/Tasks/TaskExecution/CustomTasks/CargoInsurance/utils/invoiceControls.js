export const invoiceControls = ({
	insuranceDetails = {},
	policyDetails = {},
	INVOICE_DATE = '',
}) => [
	{
		label       : 'Invoice Number',
		name        : 'invoiceNo',
		type        : 'text',
		placeholder : 'Enter Invoice Number',
		span        : 5,
		rules       : { required: 'Invoice No is required' },
		value       : insuranceDetails?.invoiceNo,
	},
	{
		label                 : 'Invoice Date',
		name                  : 'invoiceDate',
		type                  : 'datepicker',
		span                  : 5,
		isClearable           : true,
		maxDate               : new Date(),
		value                 : INVOICE_DATE,
		rules                 : { required: 'Invoice Date is required' },
		isPreviousDaysAllowed : true,
		showOptional          : false,
	},
	{
		label      : 'Upload GST Certificate',
		name       : 'gstDoc',
		span       : 4,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		uploadIcon : 'ic-upload',
		className  : 'primary md',
		height     : 80,
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/'
			+ 'msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		value      : insuranceDetails?.verificationDoc?.gstDoc,
		rules      : { required: 'Required' },
	},
	{
		label      : 'Upload PAN Certificate',
		name       : 'panDoc',
		span       : 4,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		uploadIcon : 'ic-upload',
		className  : 'primary md',
		height     : 80,
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application'
			+ '/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		value      : insuranceDetails?.verificationDoc?.panDoc,
		rules      : { required: 'Required' },
	},
	{
		label      : 'Upload Commercial Invoice',
		name       : 'invoiceDoc',
		span       : 4,
		type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		uploadIcon : 'ic-upload',
		className  : 'primary md',
		height     : 80,
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/msword,application'
			+ '/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		value:
			insuranceDetails?.verificationDoc?.invoiceDoc
			|| policyDetails?.commercial_invoice?.url,
		rules: { required: 'Required' },
	},
];
