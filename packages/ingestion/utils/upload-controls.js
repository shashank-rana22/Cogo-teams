const uploadControls = [

	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Name',
		isClearable : true,
		rules       : { required: 'Country is Required' },
	},
	{
		name        : 'description',
		label       : 'Description',
		type        : 'textArea',
		placeholder : 'Description',
		isClearable : true,
		// rules       : { required: 'Partner is Required' },

	},
	{
		name       : 'upload',
		label      : 'Upload',
		type       : 'file',
		// placeholder : 'Upload Here...',
		// isClearable : true,
		rules      : { required: 'File is Required' },
		uploadType : 'aws',
		accept     : '.png,.jpg',

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
