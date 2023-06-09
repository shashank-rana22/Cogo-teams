export const extraDocsControls = [
	{
		name   : 'offer_letter',
		label  : 'Upload Previous Offer letter',
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
