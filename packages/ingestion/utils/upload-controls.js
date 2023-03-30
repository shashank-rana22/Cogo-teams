const uploadControls = [

	{
		name        : 'file_name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Name',
		isClearable : true,
		rules       : { required: 'Name is Required' },
	},
	{
		name        : 'description',
		label       : 'Description',
		type        : 'textArea',
		placeholder : 'Description',
		isClearable : true,

	},
	{
		name       : 'file_url',
		label      : 'Upload',
		type       : 'file',
		// multiple   : 'multiple',
		// placeholder : 'Upload Here...',
		// isClearable : true,
		rules      : { required: 'File is Required' },
		uploadType : 'aws',
		accept     : '.csv',

	},
	// {
	// 	name        : 'is_cp',
	// 	label       : 'Is Channel Partner',
	// 	type        : 'select',
	// 	options     : IsCpOptions,
	// 	placeholder : 'Type Here...',
	// },

];

export default uploadControls;
