const controls = (disabledProp) => {
	const control = [
		{
			name  : 'description',
			label : 'Description',
			type  : 'text',
			span  : 6,
		},
		{
			name     : 'doc_number',
			label    : 'Document Number',
			type     : 'text',
			span     : 6,
			disabled : !!disabledProp,
			rules    : {
				required: true,
			},
		},

		{
			name         : 'airway_bill',
			type         : 'file',
			label        : 'Upload Airway Bill',
			showProgress : true,
			span         : 6,
			accept:
				`image/*,.pdf,.doc,.docx,application/msword,
				application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
			uploadType : 'aws',
			drag       : true,
			uploadIcon : 'ic-upload',
			rules      : {
				required: true,
			},
		},
	];
	return control;
};

export default controls;
