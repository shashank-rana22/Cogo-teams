export const uploadChecklistFields = () => ({
	fields: [
		{
			key   : 'invoice_no',
			label : 'Invoice Number',
			span  : 3,
			func  : 'handleInvoiceNo',
		},
		{
			key   : 'uploaded_on',
			label : 'Uploaded On',
			span  : 3,
			func  : 'handleUploadDate',
		},
		{
			key   : 'view_doc',
			label : 'View Commercial Invoice',
			span  : 3,
			func  : 'handleViewDoc',
		},
		{
			key   : 'upload_doc',
			label : '',
			span  : 3,
			func  : 'handleUploadDoc',
		},
	],
});
