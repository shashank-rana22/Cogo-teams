const controls = [
	{
		name        : 'ifsc_code',
		label       : 'IFSC Code',
		type        : 'input',
		placeholder : 'Enter IFSC Code',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'account_holder_name',
		label       : 'Account Holder Name',
		type        : 'input',
		placeholder : 'Enter Account Holder Name',
	},
	{
		name        : 'bank_name',
		label       : 'Bank Name',
		type        : 'input',
		placeholder : 'Enter Bank Name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'branch_name',
		label       : 'Branch Name',
		type        : 'input',
		placeholder : 'Enter Branch Name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'bank_account_number',
		label       : 'Bank Account Number',
		type        : 'number',
		placeholder : 'Enter Bank Account Number',
		rules       : { required: 'This is required' },
	},
	{
		name  : 'cancelled_cheque',
		label : 'Upload Cancelled Cheque',
		type  : 'fileUpload',
		rules : { required: 'This is required' },
	},

];

export default controls;
