const reUploadControls = [

	{
		name        : 're_upload',
		label       : 'Re-Upload your files',
		type        : 'file',
		placeholder : 'Upload Corrected CSV',
		rules       : { required: 'File is Required' },
		uploadType  : 'aws',
		accept      : '.csv',
	},

];

export default reUploadControls;
