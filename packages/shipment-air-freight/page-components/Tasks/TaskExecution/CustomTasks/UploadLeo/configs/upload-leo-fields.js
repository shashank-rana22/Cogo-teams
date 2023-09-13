export const uploadLeoFields = () => ({
	fields: [
		{
			key   : 'shipping_bill_number',
			label : 'Shipping Bill Number',
			span  : 3,
			func  : 'handleShippingBillNo',
		},
		{
			key   : 'uploaded_on',
			label : 'Uploaded On',
			span  : 3,
			func  : 'handleUploadDate',
		},
		{
			key   : 'view_doc',
			label : 'View Doc',
			span  : 3,
			func  : 'handleViewDoc',
		},
		{
			key   : 'upload_doc',
			label : '',
			span  : 3,
			func  : 'handleUploadDoc',
		},
		{
			key   : 'check_status',
			label : '',
			span  : 3,
			func  : 'handleUploadStatus',
		},
	],
});
