export const extraDocsControls = [

	// {
	// 	name        : 'pay_slip',
	// 	label       : 'Re-Upload your files',
	// 	type        : 'fileUpload',
	// 	placeholder : 'Upload Corrected CSV',
	// 	rules       : { required: 'File is Required' },
	// 	uploadType  : 'aws',
	// 	accept      : '.csv',
	// },
	// {
	// 	name        : 'prev_',
	// 	label       : 'Upload your files',
	// 	type        : 'fileUpload',
	// 	placeholder : 'Upload Corrected CSV',
	// 	rules       : { required: 'File is Required' },
	// 	uploadType  : 'aws',
	// 	accept      : '.csv',
	// },
	{
		name   : 'offer_letter',
		label  : 'Upload Offer letter ',
		type   : 'fileUpload',
		accept : '.pdf',
		rules  : { required: 'Previous Offer letter is required' },
	},
	{
		name   : 'salary_slip',
		label  : 'Upload latest salary slip',
		type   : 'fileUpload',
		accept : '.pdf',
		rules  : { required: 'Latest salary slip is required' },
	},

];
