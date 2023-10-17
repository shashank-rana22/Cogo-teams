const SHIPMENT_DOCUMENTS_CONFIG = {
	showHeader   : true,
	headerStyles : { marginBottom: '16px', borderRadius: '8px', background: '#333', paddingLeft: '14px' },
	bodyStyles   : {
		border     : '1px solid #C7C7C7',
		color      : ' #333333',
		fontWeight : '400',
		fontSize   : '12px',
		lineHeight : '14px',
	},
	fields: [
		{
			label : 'Document type',
			key   : 'document_type',
			span  : 1.5,
			func  : 'DocumentTypeFunc',
		},
		{
			label : 'Document number',
			key   : 'document_type',
			span  : 1.2,
			func  : 'DocumentNumberFunc',
		},
		{
			label : 'Uploaded by',
			key   : 'uploaded_by_org.business_name',
			span  : 1.4,
			func  : 'UploadedTypeFunc',
		},
		{
			label : 'Uploaded on',
			key   : 'uploaded_at',
			span  : 1.5,
			func  : 'UploadedOnFunc',
		},
		{
			label : 'Source',
			key   : 'uploaded_by_org.business_name',
			span  : 1.5,
		},
		{
			label : 'Service',
			key   : 'service_type',
			span  : 1.2,
			func  : 'ServiceTypeFunc',
		},
		{
			label : 'Document Status',
			key   : 'state',
			span  : 1,
			func  : 'DocumentStatus',
		},
		{
			key  : 'view',
			span : 0.4,
			func : 'viewFunc',
		},
		{
			key  : 'download',
			span : 0.3,
			func : 'downloadFunc',
		},
	],
};
export default SHIPMENT_DOCUMENTS_CONFIG;