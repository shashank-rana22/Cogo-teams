const uploadControls = [

	{
		name        : 'file_name',
		label       : 'File Name',
		component   : 'text',
		placeholder : 'Name',
		rules       : { required: 'Name is Required' },
	},
	{
		name        : 'description',
		label       : 'Description',
		component   : 'textArea',
		placeholder : 'Description',
		isClearable : true,
		style       : { height: '80px' },
	},
	{
		name       : 'file_url',
		label      : 'Upload',
		component  : 'file',
		rules      : { required: 'File is Required' },
		uploadType : 'aws',
		accept     : '.csv',
		style      : { height: '152px', padding: '0px' },
		type       : 'card',

	},

];

export default uploadControls;
