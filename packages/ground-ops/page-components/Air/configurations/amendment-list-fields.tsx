const AmendmentListFields = {
	fields: [
		{
			key   : 'serialId',
			label : 'SID',
			span  : 0.8,
			func  : 'handleSerialId',
		},
		{
			key   : 'documentNumber',
			label : 'Document Number',
			span  : 1.2,
		},
		{
			key   : 'blCategory',
			label : 'AWB',
			span  : 1.2,
			func  : 'handleBlCategory',
		},
		{
			key   : 'deadline',
			label : 'Due On',
			span  : 1.2,
			func  : 'handleDeadline',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1,
			func  : 'handleStatus',
		},
		{
			key   : 'download',
			label : '',
			span  : 0.4,
			func  : 'handleDownload',
		},
		{
			key   : 'edit',
			label : '',
			span  : 0.4,
			func  : 'handleEdit',
		},
	],
};

export default AmendmentListFields;
