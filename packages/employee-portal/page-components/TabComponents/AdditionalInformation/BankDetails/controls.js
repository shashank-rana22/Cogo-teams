import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
		rules       : { required: 'This is required' },
	},
	{
		name        : 'bank_name',
		label       : 'Bank Name',
		type        : 'input',
		placeholder : 'Enter Bank Name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'bank_branch_name',
		label       : 'Branch Name',
		type        : 'input',
		placeholder : 'Enter Branch Name',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'account_number',
		label       : 'Bank Account Number',
		type        : 'password',
		placeholder : 'Enter Bank Account Number',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'account_number_confirmation',
		label       : 'Reenter Bank Account Number',
		type        : 'number',
		placeholder : 'Enter Bank Account Number',
		rules       : { required: 'This is required' },
	},
	{
		name    : 'cancelled_check_url',
		label   : 'Upload Cancelled Cheque',
		type    : 'fileUpload',
		accept  : '.pdf',
		rules   : { required: 'This is required' },
		maxSize : GLOBAL_CONSTANTS.options.upload_file_size['5MB'],

	},

];

export default controls;
