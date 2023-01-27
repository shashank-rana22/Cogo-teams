const SUPPLIER_HISTORY = {
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
			label : 'SID',
			key   : 'sid',
			span  : 1.5,
			// func: 'DocumentTypeFunc'
		},
		{
			label : 'SERVICE',
			key   : 'service',
			span  : 1.5,
		},
		{
			label : 'Uploaded on',
			key   : 'uploaded_at',
			span  : 1.5,
			// func: 'UploadedOnFunc'
		},

		{
			key  : 'view',
			span : 0.5,
			func : 'viewFunc',
		},
		{
			key  : 'download',
			span : 0.5,
			func : 'downloadFunc',
		},
	],
};
export default SUPPLIER_HISTORY;
