const UPLOAD_TERMINAL_CHARGE_CONTROL = [
	{
		name        : 'csr_reference_number',
		label       : 'TC Invoice Number',
		type        : 'text',
		placeholder : 'Type TC Invoice No',
		span        : 6,
		rules:
			{
				required: 'TC Invoice No. is required',
			},

	},
	{
		name       : 'terminal_charge_document',
		label      : 'Terminal Charge Receipt',
		type       : 'file',
		drag       : true,
		span       : 6,
		maxSize    : '10485760',
		uploadType : 'aws',
		accept     : '.pdf',
		rules      : {
			required: true,
		},

	},

];
export default UPLOAD_TERMINAL_CHARGE_CONTROL;
