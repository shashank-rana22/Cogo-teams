export const controls = [
	{
		name        : 'remarks',
		label       : 'Reason For Extending Expiry',
		type        : 'text',
		placeholder : 'Enter Reason',
		className   : 'remarks',
		rules       : {
			required: 'Reason is required',
		},
	},
	{
		label         : 'Upload File',
		name          : 'url',
		type          : 'file',
		draggable     : true,
		loading       : true,
		className     : 'upload_file',
		dropareaProps : {
			heading    : 'Upload your file here',
			subHeading : 'supports - jpeg, jpg, svg, png, pdf, docx',
		},
		accept : '.jpeg, .xlsx, .jpg, .pdf, .png, .svg',
		rules  : {
			required: 'Document is required',
		},
	},
];
