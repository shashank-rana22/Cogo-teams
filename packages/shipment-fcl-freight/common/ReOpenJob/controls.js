const controls = [
	{
		name       : 'proof_url',
		label      : 'Upload Proof *',
		input_type : 'file',
		themeType  : 'secondary',
		drag       : true,
		rules      : {
			required: {
				value   : true,
				message : 'File is required',
			},
		},
		showProgress : true,
		draggable    : true,
	},
	{
		name        : 'remark',
		label       : 'Remarks *',
		input_type  : 'textarea',
		rules       : { required: 'Remark is required' },
		placeholder : 'Enter remarks',
	},
];

export default controls;
