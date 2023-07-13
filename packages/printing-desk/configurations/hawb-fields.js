export const hawbFields = {
	fields: [
		{
			key   : 'serialId',
			label : 'SID',
			span  : 2,
			func  : 'handleSerialId',
		},
		{
			key   : 'documentNumber',
			label : 'Document Number',
			span  : 2,
			func  : 'handleDocumentNumber',
		},
		{
			key   : 'documentType',
			label : 'AWB',
			span  : 2,
			func  : 'startCase',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 2,
			func  : 'handleStatus',
		},
		{
			key   : 'download',
			label : '',
			span  : 1,
			func  : 'handleDownload',
		},
		{
			key   : 'edit',
			label : '',
			span  : 1,
			func  : 'handleEdit',
		},
	],
};
