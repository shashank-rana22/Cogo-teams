export const nonRecurringUploadInvoice = ({ formData }) => [
	{
		span    : 12,
		groupBy : [
			{
				name          : 'uploadedInvoice',
				label         : 'Upload Invoice',
				type          : 'fileUploader',
				draggable     : true,
				loading       : true,
				value         : formData?.uploadedInvoice,
				dropareaProps : { heading: 'Upload your file here', subHeading: 'supports - jpeg, pdf, docx' },
				accept        : '.jpeg, .xlsx, .jpg, .pdf, .png, .svg',
				style         : { width: '420px' },
				span          : 12,
			},
		],
	},
];
