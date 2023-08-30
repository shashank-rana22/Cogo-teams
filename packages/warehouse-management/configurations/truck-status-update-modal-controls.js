const controls = [
	{
		name       : 'image_url',
		label      : 'Upload Image',
		type       : 'file',
		uploadType : 'aws',
		accept     : '.png, .jpeg',
		rules      : { required: 'File is Required' },
	},
];

export default controls;
