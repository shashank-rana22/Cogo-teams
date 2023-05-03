const reUploadControls = [

	{
		name        : 're_file_name',
		label       : 'File Name',
		type        : 'text',
		placeholder : 'File Name',
		rules       : { required: 'Name is Required' },
	},
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
