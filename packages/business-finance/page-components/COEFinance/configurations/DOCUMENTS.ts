const DOCUMENTS = {
	showHeader         : true,
	headerStyles       : { marginBottom: '16px', borderRadius: '8px', background: '#333' },
    bodyStyles          :{border: '1px solid #C7C7C7',color:' #333333',fontWeight: '400',fontSize: '12px',lineHeight: '14px'},
	fields             : [
        {
			label: 'Document Type',
            key: 'document_type',
			span: 1.5,
		},
        {
            label: 'View',
            key: 'view',
			span: 0.5,
			func: 'viewFunc'
		},
        {
            label: 'Download',
            key: 'download',
			span: 0.5,
			func: 'downloadFunc'
		},
	],
};
export default DOCUMENTS;