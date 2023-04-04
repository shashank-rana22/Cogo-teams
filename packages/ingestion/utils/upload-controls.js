const uploadControls = [

	{
		name        : 'file_name',
		label       : 'File Name',
		type        : 'text',
		placeholder : 'Name',
		// isClearable : true,
		rules       : { required: 'Name is Required' },
	},
	{
		name        : 'description',
		label       : 'Description',
		type        : 'textArea',
		placeholder : 'Description',
		isClearable : true,
		style       : { height: '80px' },
	},
	{
		name       : 'file_url',
		label      : 'Upload',
		type       : 'file',
		// placeholder : 'Upload Here...',
		// isClearable : true,
		rules      : { required: 'File is Required' },
		uploadType : 'aws',
		accept     : '.csv',
		style      : { height: '152px', padding: '0px' },

	},

];

export default uploadControls;
