export const recurringUploadInvoice: any = () => [
	{
		span    : 12,
		groupBy : [
			{
				name          : 'uploadedInvoice',
				label         : 'Upload Invoice',
				type          : 'fileUploader',
				draggable     : true,
				loading       : true,
				accept        : '.jpeg, .xlsx, .jpg, .pdf, .png, .svg, .docx',
				dropareaProps : { heading: 'Upload your file here', subHeading: 'supports - jpeg, pdf, docx' },
				style         : { width: '420px' },
				span          : 12,
			},
		],
	},
];
