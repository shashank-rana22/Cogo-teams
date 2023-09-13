const controls = [
	{
		name       : 'proof_url',
		label      : 'Upload Proof',
		input_type : 'file',
		type       : 'card',
		themeType  : 'secondary',
		rules      : {
			required: {
				value   : true,
				message : 'File is required',
			},
		},
		showProgress : true,
		uploadDesc   : 'Upload Files',
	},
	{
		name        : 'remark',
		label       : 'Remarks',
		input_type  : 'textarea',
		rules       : { required: 'Remark is required' },
		placeholder : 'Enter remarks',
	},
];

export default controls;
