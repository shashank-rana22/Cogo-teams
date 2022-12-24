 const SHIPMENT_DOCUMENTS_CONFIG = {
	showHeader         : true,
	headerStyles       : { marginBottom: '16px', borderRadius: '8px', background: '#333' },
    bodyStyles          :{border: '1px solid #C7C7C7',color:' #333333',fontWeight: '400',fontSize: '12px',lineHeight: '14px'},
	fields             : [
        {
			label: 'Document type',
            key: 'documentType',
			span: 1.5,
		},
        {
			label: 'Uploaded by',
            key: 'uploadedBy',
			span: 1.5,
		},
        {
			label: 'Uploaded on',
            key: 'uploadedOn',
			span: 1.5,
		},
        {
			label: 'Source',
            key: 'source',
			span: 1.5,
		},
        {
			label: 'Service',
            key: 'service',
			span: 1.5,
		},
        {
			label: 'Document Status',
            key: 'documentStatus',
			span: 1.5,
		},
        {
            key: 'view',
			span: 0.5,
		},
        {
            key: 'download',
			span: 0.5,
		},
			],
};
export default SHIPMENT_DOCUMENTS_CONFIG;