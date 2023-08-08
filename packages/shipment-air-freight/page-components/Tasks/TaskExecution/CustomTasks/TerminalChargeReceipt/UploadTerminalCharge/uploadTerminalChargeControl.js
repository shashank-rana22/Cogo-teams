const UPLOAD_TERMINAL_CHARGE_CONTROL = [
	{
		name        : 'csr_reference_number',
		label       : 'CSR Reference Number',
		type        : 'text',
		placeholder : 'Type Reference Number',
		span        : 6,
		rules:
			{
				required: 'CSR Reference Number is required',
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
