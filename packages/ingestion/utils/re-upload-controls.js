const reUploadControls = [

	{
		name        : 're_file_name',
		label       : 'File Name',
		component   : 'text',
		placeholder : 'File Name',
		rules       : { required: 'Name is Required' },
	},
	{
		name        : 're_upload',
		label       : 'Re-Upload your files',
		component   : 'file',
		placeholder : 'Upload Corrected CSV',
		rules       : { required: 'File is Required' },
		uploadType  : 'aws',
		accept      : '.csv',
		type        : 'card',
	},

];

export default reUploadControls;
