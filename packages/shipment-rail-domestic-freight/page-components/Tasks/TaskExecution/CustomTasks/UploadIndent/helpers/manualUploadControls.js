const manualUploadControls = [{
	name     : 'documents',
	type     : 'fieldArray',
	controls : [
		{
			drag  : true,
			name  : 'url',
			span  : 5,
			type  : 'file',
			label : 'Document',
			rules : {
				required: {
					value   : true,
					message : 'Document is required',
				},
			},
			accept:
					'image/*,.pdf,.doc,.docx,.xlsx,application/msword,'
					+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			themeType     : 'primary',
			isShipment    : true,
			uploadIcon    : 'ic-upload',
			document_type : 'indent',
		},
		{
			name  : 'description',
			rows  : 7,
			span  : 5,
			type  : 'textArea',
			label : 'Document Description (optional)',
		},
	],
	showButtons      : false,
	showDeleteButton : false,
}];

export default manualUploadControls;
