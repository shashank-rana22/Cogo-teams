export const recurringUploadInvoice = () => [
	{
		span    : 12,
		groupBy : [
			{
				name          : 'uploadedInvoice',
				label         : 'Upload Invoice',
				type          : 'fileUploader',
				draggable     : true,
				loading       : true,
				dropareaProps : { heading: 'Upload your file here', subHeading: 'supports - jpeg, pdf, docx' },
				style         : { width: '420px' },
				span          : 12,
			},
		],
	},
];
