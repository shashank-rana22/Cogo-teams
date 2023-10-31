const FIN_OPR_CONFIG = {
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
			label : 'Invoice Number',
			key   : 'document_type',
			span  : 1.9,
			func  : 'DocumentTypeFunc',
		},
		{
			label : 'Trade Party',
			key   : 'document_type',
			span  : 1.4,
			func  : 'DocumentNumberFunc',
		},
		{
			label : 'Invoice Date',
			key   : 'uploaded_by_org.business_name',
			span  : 1.4,
			func  : 'UploadedTypeFunc',
		},
		{
			label : 'Invoice Amt. ',
			key   : 'uploaded_at',
			span  : 1.5,
			func  : 'UploadedOnFunc',
		},
		{
			label : 'Status',
			key   : 'uploaded_by_org.business_name',
			span  : 1.5,
		},
	],
};
export default FIN_OPR_CONFIG;
