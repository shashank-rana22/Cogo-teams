const controls = [
	{
		name      : 'resume',
		label     : 'Upload Resume',
		type      : 'fileUpload',
		multiple  : false,
		draggable : true,
		rules     : { required: { value: true, message: 'This is required' } },
	},

];

export default controls;
