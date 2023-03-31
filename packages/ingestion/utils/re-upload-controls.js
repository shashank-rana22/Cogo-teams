const reUploadControls = [

	{
		name        : 'reupload',
		label       : 'ReUpload',
		type        : 'file',
		multiple    : 'multiple',
		placeholder : 'Upload Corrected CSV',
		// isClearable : true,
		rules       : { required: 'File is Required' },
		uploadType  : 'aws',
		accept      : '.csv',

	},

];

export default reUploadControls;
