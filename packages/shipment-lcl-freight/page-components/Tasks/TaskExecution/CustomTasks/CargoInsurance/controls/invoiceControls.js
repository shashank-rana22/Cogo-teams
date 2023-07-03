const fileUploadRestControls = {
	type       : 'file',
		themeType  : 'secondary',
		drag       : true,
		uploadIcon : 'ic-upload',
		height     : 80,
		accept:
			'image/*,.pdf,.doc,.docx,.xlsx,application/'
			+ 'msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		rules      : { required: 'Required' },
		span       : 4,

}

export const invoiceControls = [
	{
		label       : 'Invoice Number',
		name        : 'invoiceNo',
		type        : 'text',
		placeholder : 'Enter Invoice Number',
		span        : 5,
		rules       : { required: 'Invoice No is required' },
	},
	{
		label                 : 'Invoice Date',
		name                  : 'invoiceDate',
		type                  : 'datepicker',
		span                  : 5,
		isClearable           : true,
		maxDate               : new Date(),
		rules                 : { required: 'Invoice Date is required' },
		isPreviousDaysAllowed : true,
		showOptional          : false,
		showTimeSelect        : true,
		dateFormat            : 'MMM dd, yyyy, hh:mm:ss aaa',
	},
	{
		label      : 'Upload GST Certificate',
		name       : 'gstDoc',
		...fileUploadRestControls
		
	},
	{
		label      : 'Upload PAN Certificate',
		name       : 'panDoc',
		...fileUploadRestControls
	},
	{
		label      : 'Upload Commercial Invoice',
		name       : 'invoiceDoc',
		...fileUploadRestControls
	},
];
