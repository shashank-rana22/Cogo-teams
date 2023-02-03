interface FilterProps {
	invoice?:any
}

export const recurringUploadInvoice = (filters:FilterProps, setFilters:Function) => [
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
				style         : { width: '410px' },
				span          : 12,
			},
		],
	},
];
