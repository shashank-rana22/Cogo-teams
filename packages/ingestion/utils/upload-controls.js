const uploadControls = [

	{
		name        : 'file_name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Name',
		// isClearable : true,
		rules       : { required: 'Name is Required' },
	},
	{
		name        : 'description',
		label       : 'Description',
		type        : 'textArea',
		// placeholder : 'Description',
		isClearable : true,
		style       : { height: '160px' },
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
		// style      : { padding: '12px 0 0 0', margin: '0 0 20px 0' },

	},

];

export default uploadControls;
