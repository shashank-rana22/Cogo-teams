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
		// style       : { height: '180px', border: '1px solid #BDBDBD', borderRadius: 2, marginTop: '20px' },
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

	},

];

export default uploadControls;
