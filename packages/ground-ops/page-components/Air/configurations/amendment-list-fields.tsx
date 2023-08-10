const AmendmentListFields = {
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
		},
		{
			key   : 'blCategory',
			label : 'AWB',
			span  : 2,
			func  : 'handleBlCategory',
		},
		{
			key   : 'deadline',
			label : 'Due On',
			span  : 2,
			func  : 'handleDeadline',
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

export default AmendmentListFields;
